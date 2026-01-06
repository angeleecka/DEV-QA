# Manual Test Cases (v0)

Case format: **ID / Title / Priority / Preconditions / Steps / Expected Result**

---

## TC-CTX-01 — Context menu opens item actions (Item scope)

**Priority:** High  
**Related FM:** FM-01

### Preconditions

- Admin + file manager is open
- At least 1 file/folder is visible in the panel

### Steps

1. Hover a file (or folder) in the panel.
2. Right-click on the item.
3. Review menu items.

### Expected result

- Context menu opens.
- Menu contains **item** actions (e.g., rename/delete/preview, etc.).
- It is not a “panel actions only” menu.

---

## TC-CTX-02 — Context menu opens panel actions (Panel scope)

**Priority:** High  
**Related FM:** FM-01

### Preconditions

- Admin + file manager is open

### Steps

1. Right-click on an **empty area** inside the panel (not on any item).
2. Review menu items.

### Expected result

- Panel context menu opens.
- Panel actions are present (e.g., create folder/paste/refresh — depending on implementation).
- Item-only actions are absent or disabled.

---

## TC-CTX-03 — Action applies to source panel (targetPanel)

**Priority:** High  
**Related FM:** FM-02

### Preconditions

- Split mode (two panels) is available
- Left and right panels show different paths
- There is at least one item suitable for rename (or another simple action)

### Steps

1. Open the context menu on an item in the **LEFT panel**.
2. Choose an action (e.g., Rename).
3. Complete the action (enter a new name and save).
4. Verify where the change was applied.

### Expected result

- The action is applied to the item in the **left panel**, not the right.
- The active/highlighted panel matches the source panel of the menu (if intended).

---

## TC-PRV-01 — Preview opens inside the active panel

**Status:** Deprecated (Changed by design)  
**Note:** PreviewPane is not used; Lightbox is used instead.

**Priority:** High  
**Related FM:** FM-03

### Preconditions

- Split mode or “active panel” concept exists
- A media file exists (image/video) for preview

### Steps

1. Activate Panel A (click inside it).
2. Open preview for the selected media (via button/context menu/double click — as implemented).
3. Observe where the PreviewPane appears.

### Expected result

- PreviewPane is shown **inside the active panel**.
- Preview does not appear in the other panel unexpectedly.

---

## TC-LB-01 — Media opens in Lightbox (current behavior)

**Priority:** Med  
**Status:** Ready  
**Related FM:** FM-03  
**Env:** Both

### Preconditions

- A media item exists (image/video)

### Steps

1. Open a folder with media items.
2. Trigger open action (as currently implemented: click/double click/menu).

### Expected result

- Media opens in Lightbox.
- UI remains stable; user can close Lightbox and return to the list.

---

## TC-DND-03 — Prevent moving folder into itself/descendant

**Priority:** High  
**Related FM:** FM-04

### Preconditions

- Folder `A` exists and contains `A/sub`
- Folder drag & drop move is enabled

### Steps

1. Try dragging folder `A` into `A/sub` (or into itself via UI).
2. Drop.

### Expected result

- The move is blocked.
- A clear message/toast appears or the drop is ignored.
- File structure remains unchanged.

---

## TC-UPL-02 — External file drop uploads into target folder

**Priority:** High  
**Related FM:** FM-05

### Preconditions

- File manager is open and a target folder is selected
- A local test file exists (e.g., `test.jpg`)
- Drag & drop upload is supported

### Steps

1. Drag `test.jpg` from OS file explorer into the file manager panel.
2. Drop it inside the panel area (current folder).
3. Wait for completion.

### Expected result

- The file uploads into the **current target folder**.
- A single success toast is shown.
- The file appears in the list (auto refresh if needed).

---

## TC-VAL-01 — Disallowed characters in names are rejected

**Priority:** High  
**Related FM:** FM-06

### Preconditions

- Create folder or Rename operation is available

### Steps

1. Try creating a folder named `bad:name` (or `bad|name`).
2. Try renaming a file to a name with a disallowed character.
3. Observe UI behavior.

### Expected result

- Validation error is shown.
- The operation is not executed.
- The message clearly explains the name is invalid.

---

## TC-UX-01 — Single click selects (desktop)

**Priority:** High  
**Related FM:** FM-08

### Preconditions

- Admin is open on desktop (mouse/trackpad)
- At least one file/folder exists in the panel

### Steps

1. Single-click an item.
2. Move the cursor away (to check selection persistence).
3. Observe UI.

### Expected result

- The item becomes selected and **stays selected** after moving the cursor away.
- Nothing opens (no lightbox/preview) from a single click.

---

## TC-NAV-01 — Path is correct after navigating up/back

**Priority:** High  
**Status:** Draft  
**Related FM:** FM-09  
**Env:** Both

### Preconditions

- A nested folder structure exists (e.g., `Upload/A/B`)

### Steps

1. Open `Upload/A/B`.
2. Click “Up/Back” to go one level up.
3. Compare the displayed path with the actual opened folder (by content/tree).

### Expected result

- UI path matches the current folder after navigation.
- No leftover/incorrect path segments remain.

---

## TC-ERR-01 — Operation shows clear error and UI remains stable

**Priority:** High  
**Status:** Ready  
**Related FM:** FM-07  
**Env:** Both

### Preconditions

- Admin + file manager is open
- There is an operation to execute (e.g., rename or create folder)

### Steps (Option A — go offline)

1. Open DevTools → Network.
2. Enable **Offline**.
3. Perform an operation (e.g., Rename or Create folder).
4. Disable Offline.
5. Refresh the folder/list.

### Expected result

- A **clear error toast** is shown (no server paths/stack traces).
- The app does not crash or freeze.
- After restoring network, the UI remains usable.
- No “partially applied” changes appear.

---
