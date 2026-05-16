## Practical3 Report

| | |
|---|---|
| **Submitted By** | Yeshey Lhaden, Sangay Choden, Sonam Choki(361), Gayley Choden |
| **Enrollment No.** | 02240371 |
| **Programme** | 2 BESWE |
| **Date** | 16/05/2025 |

---

## Table of Contents

- [1. Title](#1-title)
- [2. Aim](#2-aim)
- [3. Objectives](#3-objectives)
- [4. Learning Outcome](#4-learning-outcome)
- [5. Requirements](#5-requirements)
- [6. Procedure](#6-procedure)
- [7. Program / Code](#7-program--code)
- [8. Output](#8-output)
- [9. Observation](#9-observation)
- [10. Problems Encountered](#10-problems-encountered)
- [11. Conclusion](#11-conclusion)

---

## 1. Title

Cross-Platform Mobile Application for Student Profiles using React Native and Expo, along with MockAPI.io as the Back-end API

---

## 2. Objective

The objective is to create and develop a completely functioning cross-platform mobile application that uses React Native and Expo and performs CRUD operations for the student's profiles using a RESTful API back-end provided by MockAPI.io, with token-based authentication implemented with a fake API of `reqres.in`.

---

## 3. Objectives

- Develop a mobile application using React Native with Expo.
- Develop CRUD operations using the RESTful API.
- Create reusable UI components such as students' cards and modal form.
- Develop form validation at the client side with useful feedback.
- Token-based authentication with `reqres.in`, along with appending the token in headers with `Authorization`.
- Develop functionalities such as pull-to-refresh, loading states, and error handling.
- Use TypeScript interfaces for type safety throughout the application.

---

## 4. Learning Outcome

After completing the practical, the learner will be able to:

- Create and configure a new Expo project with TypeScript.
- Define TypeScript interfaces (`Student`, `CreateStudentInput`) for typing API response models.
- Make HTTP calls (`GET`, `POST`, `PUT`, `DELETE`) via the `fetch` API in React Native.
- Efficiently manipulate state with the `useState` and `useEffect` hooks.
- Design reusable React Native components (`StudentCard`, `StudentForm`).
- Incorporate client-side validation code with inline field-level errors.
- Work with asynchronous operations via `async/await` and handle loading/error states.
- Employ React Native `Modal`, `FlatList`, `RefreshControl`, and `Alert` components.
- Learn how to store authentication tokens in memory and attach them to HTTP headers.
- Organize the project structure according to React Native best practices.

---

## 5. Requirements

### 5.1 Hardware

- Laptop/PC (Windows/macOS/Linux)
- Physical Android/iOS device or Emulator/Simulator

### 5.2 Software & Tools

| Name        | Version/Details      | Description |
|-------------|---------------------|-------------|
| Node.js     | v20 LTS onwards     | JavaScript runtime for Expo CLI   |
| npm         | Bundled with Node.js| Package manager                  |
| Expo CLI    | latest `npx expo`   | Project setup & running          |
| VS Code     | latest              | Source code editor               |
| MockAPI.io  | Free Account        | Backend REST API with hosted students data |
| reqres.in   | Free Fake API       | For simulated login/token creation |
| Expo Go App | latest              | Live preview app on actual device |

### 5.3 npm Dependencies

| Package | Version | Role |
|---------|---------|------|
| `expo` | ~54.0.33 | Core Expo SDK |
| `react` | 19.1.0 | UI library |
| `react-native` | 0.81.5 | Cross-platform mobile framework |
| `react-native-safe-area-context` | ~5.6.0 | Safe area insets for notch/status bar |
| `expo-status-bar` | ~3.0.9 | Status bar control |
| `typescript` | ~5.9.2 | Static typing |

---

## 6. Procedure

### Step 1: Create the Expo Project

```bash
npx create-expo-app@latest StudentProfileApp --template
# Choose: Blank (TypeScript)
cd StudentProfileApp
```

### Step 2: Install Required Packages

```bash
npx expo install react-native-safe-area-context expo-status-bar
```

### Step 3: Configure MockAPI.io Back End

1. Sign up for a free account at [mockapi.io](https://mockapi.io).
2. Start a new project and create a resource named `students`.
3. Include the following properties in your schema:

| Field | Type |
|-------|------|
| `name` | String |
| `rollNo` | String |
| `department` | String |
| `email` | String |
| `year` | Number |
| `avatar` | String |

4. Note the generated base URL (e.g., `https://xxxx.mockapi.io`).

### Step 4: Define the TypeScript Data Model

Create `src/types/Student.ts` and define the `Student` interface and `CreateStudentInput` type, omitting the auto-generated `id` field for create operations.

### Step 5: Implement the Authentication Utility

Create `src/utils/auth.ts` to handle login via `reqres.in`. This module stores the token in memory and exposes `login()`, `getToken()`, `logout()`, and `isAuthenticated()` helper functions.

**Test credentials for reqres.in:**
```
Email:    eve.holt@reqres.in
Password: cityslicka
```

### Step 6: Implement the API Layer

Create `src/api/studentApi.ts` with a central `sendRequest<T>()` helper that attaches the auth token header to every request. Export five named functions:

```
getAllStudents()    → GET    /students
getStudentById(id) → GET    /students/:id
createStudent()    → POST   /students
updateStudent()    → PUT    /students/:id
deleteStudent()    → DELETE /students/:id
```

### Step 7: Develop the StudentCard Component

Develop `src/components/StudentCard.tsx`. This component displays the student's avatar, name, and department using a row layout. It has two actions: Edit and Delete. When the Delete button is clicked, an Alert message appears for confirmation before deleting the item.

### Step 8: Develop the StudentForm Component

Develop `src/components/StudentForm.tsx`. This component has five input boxes for the following values: Name, Roll No., Department, Email, and Academic Year. Two modes exist for the form:
- **Add mode**: All inputs have no value at the beginning.
- **Edit mode**: Pre-filled information is taken from the initialData state using the `useEffect` hook.

Client-side validation occurs when the form is submitted.

### Step 9: Build the Main App Screen

Update `App.tsx` as the root screen. It manages all state, including the student list, modal visibility, the student being edited, and loading/error flags. Key interactions:

- `useEffect` triggers `loadStudents()` on mount.
- A floating action button (`+`) opens the modal in Add mode.
- Tapping a student card calls `getStudentById()` and shows details in an `Alert`.
- Tapping Edit opens the modal in Edit mode pre-filled with that student's data.
- Pull-to-refresh calls `loadStudents()` again via `RefreshControl`.

### Step 10: Run the Application

```bash
npx expo start
```

Scan the QR code with the Expo Go app, or press `a` for Android emulator / `i` for iOS simulator.

---

## 7. Program / Code

The complete source code for this practical is hosted on GitHub:

**Repository:** [https://github.com/Yesheylhaden/SWE201_02240371_practicals.git](https://github.com/Yesheylhaden/SWE201_02240371_practicals.git)

### Key Source Files

| File | Location | Description |
|------|----------|-------------|
| `App.tsx` | `/` | Root screen — state management, CRUD handlers, layout |
| `Student.ts` | `src/types/` | TypeScript interfaces for the data model |
| `studentApi.ts` | `src/api/` | All HTTP API calls with auth header injection |
| `auth.ts` | `src/utils/` | In-memory token store and login/logout helpers |
| `StudentCard.tsx` | `src/components/` | Reusable card component for the student list |
| `StudentForm.tsx` | `src/components/` | Modal form for creating and editing students |
| `app.json` | `/` | Expo app configuration |
| `package.json` | `/` | Project dependencies and scripts |
| `tsconfig.json` | `/` | TypeScript compiler configuration |

---

## 8. Output

> Screenshots were captured on a physical Android device running the app via Expo Go.

**Figure 1: Student List Screen**
![Student List Screen](/screenshots/output_student_list.jpeg)

**Figure 2: Add New Student Form (empty)**
![Add Student Form](/screenshots/output_add_form.jpeg)

**Figure 3: Form Validation Errors**
![Validation Errors](/screenshots/output_validation.jpeg)

**Figure 4: Edit Student Form (pre-filled)**
![Edit Student Form](/screenshots/output_edit_form.jpeg)

**Figure 5: Student Detail Alert (View Details)**
![Student Detail](/screenshots/output_detail_alert.jpeg)

**Figure 6: Delete Confirmation Alert**
![Delete Confirmation](/screenshots/output_delete_confirm.jpeg)

---

## 9. Observation

During the development and testing of the application the following observations were made:

- **State management with hooks** - The component logic was transparent, because `useState` was used for every piece of UI state (loading, refreshing, submitting, error, modal visibility, editing student). It was important to distinguish between `loading` (initial fetch) and `refreshing` (pull-to-refresh), so as not to hide the list while the user was actively refreshing.

- **Optimistic UI updates** — Instead of re-fetching the entire list after every create, update or delete operation, the app updates local state directly (prepending the new student, mapping over the list to swap the updated one, filtering out the deleted one). This provides instant feedback without requiring an extra network round trip.

- **Soft typing with TypeScript** — Using `Omit<Student, 'id'>` for `CreateStudentInput` was a nice way to reuse the `Student` interface, while avoiding accidentally including `id` (server-generated) in POST/PUT request bodies.

- **Auth token in memory** — Storing the token in a module level variable (`let authToken`) in `auth.ts` works well for single session apps and is simple. But when the app restarts, the token is gone and the user has to log in again.

- **MockAPI.io behaviour** — MockAPI.io auto-generates a `id` for new records and returns a full created object in the `POST` response. This made it easy to prepend the new student to the local list without having to know the ID ahead of time.

- **Form re-use with initialData** — The `StudentForm` component is generic for both Add and Edit scenarios, by checking if `initialData` is `null`. populating the fields in a useEffect hook when the initialData changes. This way the same instance of the component can be used for different students without stale data.

- **Keyboard avoidance** — The form was wrapped in `KeyboardAvoidingView` with `behavior="padding"` on iOS and `behavior="height"` on Android so the input fields were never hidden behind the software keyboard.

---

## 10. Problems Encountered

| Problem | Cause | Solution |
|---------|-------|----------|
|`SafeAreaView` from `react-native` not working correctly on Android | The built-in `SafeAreaView` only considers iOS notch; Android status bar was overlapping the header | Replaced with `SafeAreaView` from `react-native-safe-area-context` that works properly for both platforms |
| MockAPI.io returning `404` on student requests | The BASE_URL in `studentApi.ts` was pointing to a deleted/incorrect MockAPI project | Updated `BASE_URL` to match the correct project URL from the MockAPI.io dashboard |
| Form fields retaining previous student's data when switching between edit targets | `useEffect` inside `StudentForm` was not re-running because the component was not being unmounted between edits | Added `editingStudent` as a dependency in the `useEffect` so field values reset when a different student is selected |
| TypeScript error: `Property 'gap' does not exist on type 'ViewStyle'` | The `gap` CSS shorthand is only supported in newer versions of React Native | Replaced `gap: 6` in `StyleSheet` with explicit `marginBottom` between buttons |
| Delete confirmation `Alert` firing twice on Android | A `TouchableOpacity` nested inside another `TouchableOpacity` was propagating touch events | Added `onPress` handler only to the inner delete button and used `event.stopPropagation()` approach via separating the touch targets |
| Auth token not attached on first API call after login | `getToken()` was called before `login()` resolved, returning `null` | Ensured `login()` is `await`-ed before any API call is made, and the token is set synchronously inside the `login()` function before returning |

---

## 11. Conclusion

This lab illustrated the process of developing a multiplatform mobile application based on React Native and Expo from the very beginning of project creation until its completion as a functioning CRUD app with a live REST API.

The major technical accomplishment in this task is the implementation of the clear separation of responsibilities, where `studentApi.ts` deals with REST API interactions and tokens, `auth.ts` handles the authentication states, `Student.ts` defines types for the data contract, and `StudentCard`/`StudentForm` are completely generic UI elements that do not contain any business logic and rely solely on props.

The use of TypeScript throughout the project, especially `Omit<Student, 'id'>` for the create input type and typed state variables, caught several potential runtime bugs at compile time. This shows the value of static typing in mobile development. 

Using MockAPI.io as a backend eliminated the need to build a server. This let us focus entirely on the client-side architecture. It reflects real-world rapid prototyping workflows, where frontend development runs alongside backend development using mock APIs.

Overall, this practical built strong foundational competency in React Native component design, React hook-based state management, REST API integration, and TypeScript typing — all of which are directly applicable to the final project (Smart Campus Event Management System).