# Project Tasks

---

## BACKEND

### 1. Project Setup

- [ ] Initialize project (language, framework, package manager)
- [ ] Configure environment variables (`.env`)
- [ ] Set up database connection
- [ ] Run initial migrations from `database.dbml`
- [ ] Set up project folder structure

### 2. Authentication

- [ ] `POST /auth/register` — create user account
- [ ] `POST /auth/login` — authenticate and return JWT
- [ ] JWT middleware for protected routes

### 3. Invitations

- [ ] `POST /invitations` — create invitation
- [ ] `GET /invitations` — list creator's invitations
- [ ] `GET /invitations/:id` — get invitation details
- [ ] `PUT /invitations/:id` — update invitation
- [ ] `DELETE /invitations/:id` — delete invitation
- [ ] Slug uniqueness validation

### 4. Invitation Blocks (CMS)

- [ ] `POST /invitations/:id/blocks` — add block
- [ ] `PUT /invitations/:id/blocks/:blockId` — update block content
- [ ] `DELETE /invitations/:id/blocks/:blockId` — remove block
- [ ] `PATCH /invitations/:id/blocks/reorder` — update block positions

### 5. Guest Management

- [ ] `POST /invitations/:id/guests` — add guest
- [ ] `GET /invitations/:id/guests` — list guests
- [ ] `DELETE /invitations/:id/guests/:guestId` — remove guest
- [ ] Enforce unique email per invitation

### 6. Access Control (Public)

- [ ] `POST /e/:slug/verify` — validate guest email against guest list
- [ ] Return invitation data only if email is valid
- [ ] Return proper error if email is not on the list

### 7. RSVP

- [ ] `POST /e/:slug/rsvp` — guest submits attendance (confirmed/declined)
- [ ] Prevent duplicate RSVP submissions

### 8. Dashboard

- [ ] `GET /invitations/:id/dashboard` — return metrics (total, confirmed, declined, pending)

---

## FRONTEND

### 1. Project Setup

- [ ] Initialize frontend project (framework, styling)
- [ ] Configure routing
- [ ] Set up API client (base URL, auth headers)
- [ ] Set up global state/auth context

### 2. Authentication Pages

- [ ] Register page (name, email, password)
- [ ] Login page (email, password)
- [ ] Protected route guard (redirect if not authenticated)

### 3. Creator Dashboard

- [ ] List all invitations created by the logged-in user
- [ ] Quick stats per invitation (guests, RSVPs)
- [ ] Button to create new invitation
- [ ] Button to copy invitation link

### 4. Invitation Form

- [ ] Create / edit invitation form (title, slug, date, location, description, cover image)
- [ ] Slug preview (e.g. `invitation.app/e/my-event`)
- [ ] Delete invitation with confirmation

### 5. Invitation Block Editor (CMS)

- [ ] Display ordered list of blocks
- [ ] Add block (select type: text, image, button)
- [ ] Edit block content inline
- [ ] Remove block
- [ ] Reorder blocks (drag-and-drop or up/down controls)

### 6. Guest Management Page

- [ ] List guests (name, email)
- [ ] Add guest form (name + email)
- [ ] Remove guest
- [ ] Display RSVP status per guest

### 7. Public Invitation Page (`/e/:slug`)

- [ ] Email gate screen (input + submit)
- [ ] Show error if email is not on the guest list
- [ ] Render invitation blocks in order after access is granted
- [ ] Display event info (title, date, location)

### 8. RSVP Component

- [ ] "Will you attend?" prompt with Yes / No buttons
- [ ] Show confirmation feedback after submission
- [ ] Disable buttons if RSVP already submitted

---

## INTEGRATION

### 1. Authentication Flow

- [ ] Connect register/login forms to backend
- [ ] Store JWT and attach to all authenticated requests
- [ ] Handle token expiration and logout

### 2. Invitation Management

- [ ] Connect invitation list to `GET /invitations`
- [ ] Connect create/edit form to `POST` / `PUT /invitations/:id`
- [ ] Connect delete to `DELETE /invitations/:id`

### 3. Block Editor

- [ ] Connect block add/edit/delete/reorder to backend block endpoints
- [ ] Reflect saved state in the editor after each operation

### 4. Guest Management

- [ ] Connect guest list and add/remove actions to backend
- [ ] Display RSVP status fetched from guest list endpoint

### 5. Access Control

- [ ] Connect email gate form to `POST /e/:slug/verify`
- [ ] On success, fetch and render invitation blocks
- [ ] On failure, display access denied message

### 6. RSVP

- [ ] Connect Yes/No buttons to `POST /e/:slug/rsvp`
- [ ] Handle already-responded state

### 7. Dashboard Metrics

- [ ] Connect invitation dashboard view to `GET /invitations/:id/dashboard`
- [ ] Display live counts (total, confirmed, declined, pending)

### 8. End-to-End Testing

- [ ] Full creator flow: register → create invitation → add blocks → add guests → share link
- [ ] Full guest flow: open link → email gate → view invitation → RSVP
- [ ] Verify dashboard metrics update correctly after RSVPs
