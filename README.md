# 🚀 @saroarshahan/gitgc

A lightweight CLI tool that automates `git add`, `git commit`, and `git push` — with optional flags for flexibility.

---

### 📦 Installation


<table>
<tr>
  <th>npm</th>
  <th>yarn</th>
</tr>
<tr>
<td>

```sh
npm install -g @saroarshahan/gitgc
```

</td>
<td>

```sh
yarn global add @saroarshahan/gitgc
```

</td>
</tr>
<tr>
<td>

```sh
npm install @saroarshahan/gitgc
```

</td>
<td>

```sh
yarn add @saroarshahan/gitgc
```

</td>
</tr>
</table>

### 🛠️ Usage

```bash
npm gitgc "your commit message" [--options]
```

### 🔧 Options

| Flag                | Description                                              | Default  |
| ------------------- | -------------------------------------------------------- | -------- |
| `-f, --files`       | Specify files or folders to stage                        |   `.`    |
| `-r, --remote`      | Git remote to push to                                    | `origin` |
| `-b, --branch`      | Git branch to push to                                    | `main`   |
| `-a, --amend`       | Amend the last commit instead of creating a new one.     | `false`  |
| `-np, --no-push`    | Skips the `git push` step                                | `false`  |
| `-po, --push-only`  | Skip staging/commit. Only pushes to remote branch.       | `false`  |
| `-nv, --no-verify`  | Hooks are skipped using `git` flags                      |          |
| `-h`, `--help`      | Show help information                                    |          |


### 📝 Examples

```bash
# Use `gitgc` to commit and push changes if you installed it globally
gitgc "fix: resolve issue with DataTable filter state"

# Simple commit and push
npm gitgc "fix: resolve issue with DataTable filter state"

# Commit specific file
npm gitgc "style: update item alignment in CSS" --files src/header.css

# Amend the previous commit and skip push
npm gitgc "fix: reword commit" --amend --no-push

# Push to different remote and branch
npm gitgc "feat: deploy script added" --remote origin --branch dev

# Skip hooks (e.g., Husky)
gitgc "fix: skip hooks" --no-verify

# Interactive mode (no commit message)
npm gitgc
```

### 🔍 Features
- Prompt-based fallback if no message is provided
- Checks for uncommitted changes before committing
- Safe defaults with room for customization
- Clean CLI experience with color-coded output
- By default, `gitgc` respects all Git hooks (like Husky’s `pre-commit`, `commit-msg`, `pre-push`).

### 🧑‍💻 Author

**Saroar Shahan**  
[GitHub](https://github.com/SaroarShahan) • [NPM](https://www.npmjs.com/~saroarshahan)

### 📄 License
MIT License