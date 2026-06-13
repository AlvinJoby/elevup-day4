"use strict";

const storageKeys = {
  users: "aurora.users",
  theme: "aurora.theme",
  remember: "aurora.remember",
  lastLogin: "aurora.lastLogin"
};

const takenUsernames = ["admin", "root", "support", "demo", "aurora"];

const page = document.documentElement.dataset.page;
const selectors = {
  toastRegion: ".toast-region",
  userCount: "[data-user-count]",
  lastLogin: "[data-last-login]"
};

document.addEventListener("DOMContentLoaded", () => {
  initTheme();
  initStats();
  initButtons();
  initPasswordToggles();
  initLegalLinks();

  if (page === "login") {
    initLogin();
  }

  if (page === "signup") {
    initSignup();
  }
});

function getUsers() {
  try {
    const users = JSON.parse(localStorage.getItem(storageKeys.users) || "[]");
    return Array.isArray(users) ? users : [];
  } catch {
    return [];
  }
}

function saveUsers(users) {
  localStorage.setItem(storageKeys.users, JSON.stringify(users));
  initStats();
}

function normalizeEmail(value) {
  return value.trim().toLowerCase();
}

function normalizeUsername(value) {
  return value.trim().toLowerCase();
}

function initTheme() {
  const saved = localStorage.getItem(storageKeys.theme);
  const preferred = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  document.documentElement.dataset.theme = saved || preferred;

  document.querySelectorAll("[data-theme-toggle]").forEach((button) => {
    button.addEventListener("click", () => {
      const next = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
      document.documentElement.dataset.theme = next;
      localStorage.setItem(storageKeys.theme, next);
      toast(next === "dark" ? "Dark mode enabled" : "Light mode enabled", "Theme preference saved.", "success");
    });
  });
}

function initStats() {
  const users = getUsers();
  const countText = users.length === 1 ? "1 user" : `${users.length} users`;
  const lastLogin = localStorage.getItem(storageKeys.lastLogin);

  document.querySelectorAll(selectors.userCount).forEach((node) => {
    node.textContent = countText;
  });

  document.querySelectorAll(selectors.lastLogin).forEach((node) => {
    node.textContent = lastLogin ? formatDate(lastLogin) : "Not available yet";
  });
}

function initButtons() {
  document.querySelectorAll(".primary-button, .social-button").forEach((button) => {
    button.addEventListener("pointermove", (event) => {
      const rect = button.getBoundingClientRect();
      button.style.setProperty("--x", `${event.clientX - rect.left}px`);
      button.style.setProperty("--y", `${event.clientY - rect.top}px`);
    });
  });

  document.querySelectorAll("[data-social]").forEach((button) => {
    button.addEventListener("click", () => {
      toast(`${button.dataset.social} sign-in`, "Social login is ready for backend integration.", "warning");
    });
  });
}

function initPasswordToggles() {
  document.querySelectorAll("[data-toggle-password]").forEach((button) => {
    const input = document.getElementById(button.dataset.togglePassword);
    if (!input) return;

    button.addEventListener("click", () => {
      const isHidden = input.type === "password";
      input.type = isHidden ? "text" : "password";
      button.setAttribute("aria-label", isHidden ? "Hide password" : "Show password");
      input.focus();
    });
  });
}

function initLegalLinks() {
  document.querySelectorAll("[data-legal]").forEach((link) => {
    link.addEventListener("click", (event) => {
      event.preventDefault();
      toast("Demo policy", "Terms and privacy pages can be connected when backend routes exist.", "warning");
    });
  });
}

function initLogin() {
  const form = document.getElementById("loginForm");
  const email = document.getElementById("loginEmail");
  const password = document.getElementById("loginPassword");
  const remember = document.getElementById("rememberMe");

  const remembered = JSON.parse(localStorage.getItem(storageKeys.remember) || "null");
  if (remembered?.email) {
    email.value = remembered.email;
    remember.checked = Boolean(remembered.checked);
  }

  email.addEventListener("input", () => validateLoginEmail(email));
  email.addEventListener("blur", () => validateLoginEmail(email));
  password.addEventListener("input", () => validateRequired(password, "Password is required."));
  password.addEventListener("blur", () => validateRequired(password, "Password is required."));

  document.querySelector("[data-forgot]")?.addEventListener("click", () => {
    toast("Password recovery", "This frontend demo stores mock accounts locally only.", "warning");
  });

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const validEmail = validateLoginEmail(email);
    const validPassword = validateRequired(password, "Password is required.");

    if (!validEmail || !validPassword) {
      toast("Invalid credentials", "Please fix the highlighted fields and try again.", "error");
      return;
    }

    setLoading(form, true);
    await wait(700);

    const users = getUsers();
    const found = users.find((user) => user.email === normalizeEmail(email.value) && user.password === password.value);

    if (!found) {
      setLoading(form, false);
      setField(email, "error", users.length ? "No account matches those credentials." : "No registered users found. Create an account first.");
      setField(password, "error", "Check your password and try again.");
      toast("Invalid credentials", users.length ? "Email or password is incorrect." : "No local accounts are registered yet.", "error");
      return;
    }

    const now = new Date().toISOString();
    localStorage.setItem(storageKeys.lastLogin, now);
    localStorage.setItem(storageKeys.remember, JSON.stringify({ email: normalizeEmail(email.value), checked: remember.checked }));
    setField(email, "success", "Account verified.");
    setField(password, "success", "Password accepted.");
    initStats();
    toast("Login successful", `Welcome back, ${found.fullName}.`, "success");
    await wait(500);
    setLoading(form, false);
  });
}

function initSignup() {
  const form = document.getElementById("signupForm");
  const fullName = document.getElementById("fullName");
  const email = document.getElementById("signupEmail");
  const username = document.getElementById("username");
  const password = document.getElementById("signupPassword");
  const confirmPassword = document.getElementById("confirmPassword");
  const terms = document.getElementById("terms");

  fullName.addEventListener("input", () => validateFullName(fullName));
  fullName.addEventListener("blur", () => validateFullName(fullName));
  email.addEventListener("input", () => validateSignupEmail(email));
  email.addEventListener("blur", () => validateSignupEmail(email));
  username.addEventListener("input", () => validateUsername(username));
  username.addEventListener("blur", () => validateUsername(username));
  password.addEventListener("input", () => {
    validateSignupPassword(password);
    updateStrength(password.value);
    if (confirmPassword.value) validateConfirmPassword(confirmPassword, password);
  });
  password.addEventListener("blur", () => validateSignupPassword(password));
  confirmPassword.addEventListener("input", () => validateConfirmPassword(confirmPassword, password));
  confirmPassword.addEventListener("blur", () => validateConfirmPassword(confirmPassword, password));
  terms.addEventListener("change", () => validateTerms(terms));

  updateStrength("");

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const checks = [
      validateFullName(fullName),
      validateSignupEmail(email),
      validateUsername(username),
      validateSignupPassword(password),
      validateConfirmPassword(confirmPassword, password),
      validateTerms(terms)
    ];

    if (checks.includes(false)) {
      toast("Check the form", "Some details need attention before creating the account.", "error");
      return;
    }

    setLoading(form, true);
    await wait(850);

    const users = getUsers();
    const newUser = {
      id: crypto.randomUUID ? crypto.randomUUID() : `user-${Date.now()}`,
      fullName: fullName.value.trim(),
      email: normalizeEmail(email.value),
      username: normalizeUsername(username.value),
      password: password.value,
      createdAt: new Date().toISOString()
    };

    saveUsers([...users, newUser]);
    setLoading(form, false);
    toast("Account created", "Your mock user profile has been saved locally.", "success");
    form.reset();
    clearFields(form);
    updateStrength("");
    showSuccessModal();
  });
}

function validateLoginEmail(input) {
  const value = normalizeEmail(input.value);
  if (!value) return setField(input, "error", "Email address is required.");
  if (!isEmail(value)) return setField(input, "error", "Enter a valid email address.");
  return setField(input, "success", "Email format looks good.");
}

function validateRequired(input, message) {
  if (!input.value.trim()) return setField(input, "error", message);
  return setField(input, "success", "Looks good.");
}

function validateFullName(input) {
  const value = input.value.trim();
  if (!value) return setField(input, "error", "Full name is required.");
  if (value.length < 3) return setField(input, "error", "Use at least 3 characters.");
  if (/^\d+$/.test(value)) return setField(input, "error", "Name cannot contain only numbers.");
  return setField(input, "success", "Name looks professional.");
}

function validateSignupEmail(input) {
  const value = normalizeEmail(input.value);
  if (!value) return setField(input, "error", "Email address is required.");
  if (!isEmail(value)) return setField(input, "error", "Enter a valid email address.");
  if (getUsers().some((user) => user.email === value)) return setField(input, "error", "An account already uses this email.");
  return setField(input, "success", "Email is available.");
}

function validateUsername(input) {
  const value = normalizeUsername(input.value);
  if (!value) return setField(input, "error", "Username is required.");
  if (value.length < 4 || value.length > 18) return setField(input, "error", "Use 4 to 18 characters.");
  if (!/^[a-z0-9_]+$/.test(value)) return setField(input, "error", "Use letters, numbers, and underscores only.");
  if (takenUsernames.includes(value) || getUsers().some((user) => user.username === value)) {
    return setField(input, "error", "That username is already taken.");
  }
  return setField(input, "success", "Username is available.");
}

function validateSignupPassword(input) {
  const value = input.value;
  const missing = passwordRequirements(value);
  if (!value) return setField(input, "error", "Password is required.");
  if (missing.length) return setField(input, "error", `Add ${missing[0]} for a stronger password.`);
  return setField(input, "success", "Strong password.");
}

function validateConfirmPassword(input, passwordInput) {
  if (!input.value) return setField(input, "error", "Confirm your password.");
  if (input.value !== passwordInput.value) return setField(input, "error", "Passwords do not match.");
  return setField(input, "success", "Passwords match.");
}

function validateTerms(input) {
  const message = document.querySelector("[data-terms-message]");
  if (!message) return input.checked;

  if (!input.checked) {
    message.textContent = "You must agree before creating an account.";
    message.className = "message form-message is-error";
    return false;
  }

  message.textContent = "Terms accepted.";
  message.className = "message form-message is-success";
  return true;
}

function setField(input, status, message) {
  const field = input.closest(".field");
  const messageNode = field?.querySelector(".message");
  if (!field || !messageNode) return false;

  field.classList.remove("is-error", "is-success");
  field.classList.add(status === "success" ? "is-success" : "is-error");
  messageNode.textContent = message;
  input.setAttribute("aria-invalid", status === "error" ? "true" : "false");
  return status === "success";
}

function clearFields(form) {
  form.querySelectorAll(".field").forEach((field) => {
    field.classList.remove("is-error", "is-success");
    const message = field.querySelector(".message");
    const input = field.querySelector("input");
    if (message) message.textContent = "";
    if (input) input.removeAttribute("aria-invalid");
  });

  const termsMessage = form.querySelector("[data-terms-message]");
  if (termsMessage) {
    termsMessage.className = "message form-message";
    termsMessage.textContent = "";
  }
}

function isEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value);
}

function passwordRequirements(value) {
  const missing = [];
  if (value.length < 8) missing.push("at least 8 characters");
  if (!/[A-Z]/.test(value)) missing.push("an uppercase letter");
  if (!/[a-z]/.test(value)) missing.push("a lowercase letter");
  if (!/\d/.test(value)) missing.push("a number");
  if (!/[^A-Za-z0-9]/.test(value)) missing.push("a special character");
  return missing;
}

function passwordScore(value) {
  const tests = [
    value.length >= 8,
    /[A-Z]/.test(value),
    /[a-z]/.test(value),
    /\d/.test(value),
    /[^A-Za-z0-9]/.test(value)
  ];
  return tests.filter(Boolean).length;
}

function updateStrength(value) {
  const bar = document.querySelector("[data-strength-bar]");
  const label = document.querySelector("[data-strength-label]");
  if (!bar || !label) return;

  const score = passwordScore(value);
  const states = [
    { text: "Weak", width: "8%", color: "var(--danger)" },
    { text: "Weak", width: "24%", color: "var(--danger)" },
    { text: "Fair", width: "46%", color: "var(--warning)" },
    { text: "Good", width: "68%", color: "var(--accent-two)" },
    { text: "Good", width: "84%", color: "var(--accent)" },
    { text: "Strong", width: "100%", color: "var(--success)" }
  ];
  const state = states[score];
  label.textContent = state.text;
  label.style.color = state.color;
  bar.style.width = state.width;
  bar.style.background = state.color;
}

function setLoading(form, loading) {
  const button = form.querySelector("[data-submit]");
  if (!button) return;
  button.disabled = loading;
  button.classList.toggle("is-loading", loading);
  form.querySelectorAll("input, button").forEach((node) => {
    if (node !== button) node.disabled = loading;
  });
}

function toast(title, message, type = "success") {
  const region = document.querySelector(selectors.toastRegion);
  if (!region) return;

  const node = document.createElement("div");
  node.className = `toast ${type}`;
  node.setAttribute("role", "status");
  node.innerHTML = `
    <span class="toast-icon" aria-hidden="true">${type === "error" ? "!" : type === "warning" ? "i" : "✓"}</span>
    <span><strong>${escapeHtml(title)}</strong><p>${escapeHtml(message)}</p></span>
  `;
  region.appendChild(node);

  window.setTimeout(() => {
    node.style.opacity = "0";
    node.style.transform = "translateY(8px)";
    window.setTimeout(() => node.remove(), 180);
  }, 3400);
}

function showSuccessModal() {
  const modal = document.querySelector("[data-modal]");
  if (!modal) return;
  modal.hidden = false;
  modal.querySelector("a")?.focus();
}

function formatDate(value) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "Not available yet";
  return new Intl.DateTimeFormat(undefined, {
    dateStyle: "medium",
    timeStyle: "short"
  }).format(date);
}

function wait(ms) {
  return new Promise((resolve) => window.setTimeout(resolve, ms));
}

function escapeHtml(value) {
  const span = document.createElement("span");
  span.textContent = value;
  return span.innerHTML;
}
