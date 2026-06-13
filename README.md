<div align="center">
  <br />
  <h1>Aurora ID Authentication System</h1>
  <p>
    A premium, responsive, frontend-only login and registration experience built with
    <strong>HTML</strong>, <strong>CSS</strong>, and <strong>Vanilla JavaScript</strong>.
  </p>

  <p>
    <img src="https://img.shields.io/badge/HTML5-Production%20Markup-E34F26?style=for-the-badge&logo=html5&logoColor=white" alt="HTML5 badge" />
    <img src="https://img.shields.io/badge/CSS3-Premium%20UI-1572B6?style=for-the-badge&logo=css3&logoColor=white" alt="CSS3 badge" />
    <img src="https://img.shields.io/badge/JavaScript-ES6%2B-F7DF1E?style=for-the-badge&logo=javascript&logoColor=111" alt="JavaScript badge" />
    <img src="https://img.shields.io/badge/No%20Frameworks-Vanilla-14B8A6?style=for-the-badge" alt="No frameworks badge" />
  </p>

  <br />
</div>

<div align="center">
  <table>
    <tr>
      <td align="center"><strong>Modern SaaS UI</strong></td>
      <td align="center"><strong>Client Validation</strong></td>
      <td align="center"><strong>Mock Auth</strong></td>
      <td align="center"><strong>Dark Mode</strong></td>
    </tr>
    <tr>
      <td align="center">Glassmorphism, gradients, shadows</td>
      <td align="center">Realtime feedback and error states</td>
      <td align="center">LocalStorage user database</td>
      <td align="center">Saved theme preference</td>
    </tr>
  </table>
</div>

---

## Overview

<div>
  <p>
    <strong>Aurora ID</strong> is a complete authentication interface designed to feel like a real
    modern SaaS onboarding flow. It includes a split-screen desktop layout, polished form cards,
    animated floating labels, toast notifications, password strength checking, localStorage-based
    account simulation, and responsive mobile layouts.
  </p>

  <p>
    The project intentionally uses only browser-native technologies, making it easy to run,
    understand, customize, and present as a portfolio or academic project with a professional finish.
  </p>
</div>

---

## Project Files

<table>
  <thead>
    <tr>
      <th>File</th>
      <th>Purpose</th>
      <th>Highlights</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>login.html</code></td>
      <td>Login page markup</td>
      <td>Email/password form, remember me, forgot password, social login buttons, activity widget</td>
    </tr>
    <tr>
      <td><code>signup.html</code></td>
      <td>Registration page markup</td>
      <td>Name, email, username, password, confirm password, terms checkbox, success modal</td>
    </tr>
    <tr>
      <td><code>style.css</code></td>
      <td>Complete visual design system</td>
      <td>Responsive split layout, glass UI, gradients, animations, dark/light themes</td>
    </tr>
    <tr>
      <td><code>script.js</code></td>
      <td>All frontend behavior</td>
      <td>Validation, mock authentication, localStorage, toasts, theme switching, loading states</td>
    </tr>
  </tbody>
</table>

---

## Feature Set

<div>
  <h3>Authentication Simulation</h3>
  <ul>
    <li>Register new users using the signup form.</li>
    <li>Save mock user records in <code>localStorage</code>.</li>
    <li>Login using accounts created through the registration page.</li>
    <li>Prevent duplicate email registrations.</li>
    <li>Prevent duplicate usernames.</li>
    <li>Gracefully handle empty localStorage or missing accounts.</li>
  </ul>

  <h3>Smart Validation</h3>
  <ul>
    <li>Realtime validation while typing.</li>
    <li>Validation on blur.</li>
    <li>Validation on form submit.</li>
    <li>Helpful inline success and error messages.</li>
    <li>Animated error message appearance.</li>
    <li>Accessible <code>aria-live</code> feedback areas.</li>
  </ul>

  <h3>Premium User Interface</h3>
  <ul>
    <li>Modern SaaS-inspired split-screen layout.</li>
    <li>Glassmorphism authentication cards.</li>
    <li>Soft shadows and layered backgrounds.</li>
    <li>Responsive mobile-first behavior.</li>
    <li>Floating labels and input icons.</li>
    <li>Button hover effects and ripple-style highlights.</li>
    <li>Subtle welcome and reveal animations.</li>
  </ul>

  <h3>Theme System</h3>
  <ul>
    <li>Light mode and dark mode support.</li>
    <li>Theme switcher on both login and signup pages.</li>
    <li>Preference saved in <code>localStorage</code>.</li>
    <li>Smooth theme transitions.</li>
  </ul>
</div>

---

## Login Page Contents

<table>
  <tr>
    <th>Section</th>
    <th>Included Elements</th>
  </tr>
  <tr>
    <td><strong>Header</strong></td>
    <td>Logo, application name, welcome message, short description</td>
  </tr>
  <tr>
    <td><strong>Form</strong></td>
    <td>Email address, password, show/hide password button, remember me checkbox, forgot password link</td>
  </tr>
  <tr>
    <td><strong>Actions</strong></td>
    <td>Premium login button with loading animation and disabled state</td>
  </tr>
  <tr>
    <td><strong>Social Login</strong></td>
    <td>Google, GitHub, and Microsoft buttons with SVG icons</td>
  </tr>
  <tr>
    <td><strong>Footer</strong></td>
    <td>Signup link for users without an account</td>
  </tr>
  <tr>
    <td><strong>Widgets</strong></td>
    <td>Last login time and registered users count</td>
  </tr>
</table>

---

## Registration Page Contents

<table>
  <tr>
    <th>Field</th>
    <th>Validation Rules</th>
  </tr>
  <tr>
    <td><strong>Full Name</strong></td>
    <td>Required, minimum length, cannot be numbers only</td>
  </tr>
  <tr>
    <td><strong>Email Address</strong></td>
    <td>Required, valid email format, duplicate email prevention</td>
  </tr>
  <tr>
    <td><strong>Username</strong></td>
    <td>Required, 4 to 18 characters, letters/numbers/underscores only, duplicate prevention</td>
  </tr>
  <tr>
    <td><strong>Password</strong></td>
    <td>Minimum 8 characters, uppercase, lowercase, number, special character</td>
  </tr>
  <tr>
    <td><strong>Confirm Password</strong></td>
    <td>Required and must match password</td>
  </tr>
  <tr>
    <td><strong>Terms</strong></td>
    <td>Required before account creation</td>
  </tr>
</table>

---

## Password Strength Meter

<div>
  <p>The signup page includes a dynamic password strength meter with animated progress states:</p>

  <table>
    <tr>
      <th>Strength</th>
      <th>Meaning</th>
    </tr>
    <tr>
      <td><strong>Weak</strong></td>
      <td>Password is missing most security requirements.</td>
    </tr>
    <tr>
      <td><strong>Fair</strong></td>
      <td>Password meets some requirements but still needs improvement.</td>
    </tr>
    <tr>
      <td><strong>Good</strong></td>
      <td>Password is close to the required secure format.</td>
    </tr>
    <tr>
      <td><strong>Strong</strong></td>
      <td>Password satisfies all required strength checks.</td>
    </tr>
  </table>
</div>

---

## LocalStorage Data

<p>The project uses browser localStorage as a mock database. No backend is required.</p>

<table>
  <tr>
    <th>Storage Key</th>
    <th>Stores</th>
  </tr>
  <tr>
    <td><code>aurora.users</code></td>
    <td>Registered user records</td>
  </tr>
  <tr>
    <td><code>aurora.theme</code></td>
    <td>Selected light or dark theme</td>
  </tr>
  <tr>
    <td><code>aurora.remember</code></td>
    <td>Remember-me email preference</td>
  </tr>
  <tr>
    <td><code>aurora.lastLogin</code></td>
    <td>Last successful login timestamp</td>
  </tr>
</table>

> Important: This is a frontend simulation only. Passwords are intentionally stored in localStorage for demo behavior and should never be handled this way in a real production app.

---

## How to Run

<div>
  <h3>Option 1: Open Directly</h3>
  <p>Open <code>login.html</code> or <code>signup.html</code> in any modern browser.</p>

  <h3>Option 2: Use a Local Server</h3>
  <p>If you prefer serving files locally, run a simple static server from the project folder:</p>
</div>

```bash
npx serve .
```

Then open the printed local URL in your browser.

---

## Suggested Test Flow

<ol>
  <li>Open <code>signup.html</code>.</li>
  <li>Create an account with a valid name, email, username, and strong password.</li>
  <li>Confirm that the success modal appears.</li>
  <li>Go to <code>login.html</code>.</li>
  <li>Login with the same email and password.</li>
  <li>Toggle dark mode and refresh the page to confirm the theme is saved.</li>
  <li>Try registering with the same email or username to confirm duplicate prevention.</li>
</ol>

---

## Accessibility

<ul>
  <li>Semantic page structure using <code>main</code>, <code>section</code>, headings, forms, labels, and buttons.</li>
  <li>Keyboard-friendly controls and visible focus states.</li>
  <li>Screen-reader-friendly validation messages using <code>aria-live</code>.</li>
  <li>Proper input autocomplete attributes.</li>
  <li>Accessible modal dialog for account creation success.</li>
  <li>Reduced-motion support through <code>prefers-reduced-motion</code>.</li>
</ul>

---

## Responsive Design

<table>
  <tr>
    <th>Device</th>
    <th>Layout Behavior</th>
  </tr>
  <tr>
    <td><strong>Desktop</strong></td>
    <td>Premium split-screen layout with branding on the left and form card on the right</td>
  </tr>
  <tr>
    <td><strong>Tablet</strong></td>
    <td>Adaptive stacked layout with preserved branding and spacing</td>
  </tr>
  <tr>
    <td><strong>Mobile</strong></td>
    <td>Single-column form-first interface optimized for touch screens</td>
  </tr>
</table>

---

## Code Organization

<div>
  <h3><code>script.js</code> Sections</h3>
  <ul>
    <li><strong>Local Storage:</strong> user persistence, theme preference, remember-me data, last login time</li>
    <li><strong>Theme Management:</strong> system preference detection and manual switching</li>
    <li><strong>Validation:</strong> reusable field validation helpers and form-specific rules</li>
    <li><strong>Authentication:</strong> frontend-only registration and login simulation</li>
    <li><strong>Notifications:</strong> toast messages for success, warning, and error events</li>
    <li><strong>UI Interactions:</strong> password visibility, loading buttons, ripple effects, success modal</li>
  </ul>

  <h3><code>style.css</code> Sections</h3>
  <ul>
    <li>Theme variables</li>
    <li>Base page styling</li>
    <li>Branding panel</li>
    <li>Authentication card</li>
    <li>Forms and validation states</li>
    <li>Buttons and social login controls</li>
    <li>Toast notifications</li>
    <li>Success modal</li>
    <li>Animations</li>
    <li>Responsive media queries</li>
  </ul>
</div>

---

## Customization Ideas

<ul>
  <li>Replace <strong>Aurora ID</strong> with your own brand name.</li>
  <li>Connect the forms to a real backend API.</li>
  <li>Add dashboard redirection after login.</li>
  <li>Replace localStorage with secure server-side sessions.</li>
  <li>Add email verification and password reset screens.</li>
  <li>Extend social login buttons with real OAuth providers.</li>
</ul>

---

## Final Result

<div align="center">
  <h3>Built to feel polished, modern, responsive, and portfolio-ready.</h3>
  <p>
    This project goes beyond a basic login form by adding realistic validation,
    simulated authentication, professional styling, animations, accessibility,
    and a complete user experience across login and registration.
  </p>
</div>
