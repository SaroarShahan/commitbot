# 🚀 gitgc

A lightweight CLI tool that automates `git add`, `git commit`, and `git push` — with optional flags for flexibility.

---

## 📦 Installation

```bash
npm install -g @saroarshahan/gitgc
```

## 🛠️ Usage

```bash
gitgc "your commit message" [--options]
```

## 🔧 Options

| Flag           | Description                                         | Default  |
| -------------- | --------------------------------------------------  | -------- |
| `--files`      | Specify files or folders to stage                   | `.`      |
| `--remote`     | Git remote to push to                               | `origin` |
| `--branch`     | Git branch to push to                               | `main`   |
| `--amend`      | Amend the last commit instead of creating a new one | `false`  |
| `--no-push`    | Skips the `git push` step                           | `false`  |
| `-h`, `--help` | Show help information                               |          |

## 📝 Examples

```bash
# Simple commit and push
gitgc "fix: resolve issue with DataTable filter state"

# Commit specific file
gitgc "style: update item alignment in CSS" --files src/header.css

# Amend the previous commit and skip push
gitgc "fix: reword commit" --amend --no-push

# Push to different remote and branch
gitgc "feat: deploy script added" --remote upstream --branch dev

# Interactive mode (no commit message)
gitgc
```

## 🔍 Features
- Prompt-based fallback if no message is provided
- Checks for uncommitted changes before committing
- Safe defaults with room for customization
- Clean CLI experience with color-coded output

## 🧑‍💻 Author

**Saroar Shahan**  
[GitHub](https://github.com/SaroarShahan) • [NPM](https://www.npmjs.com/~saroarshahan)

## 📄 License
MIT License