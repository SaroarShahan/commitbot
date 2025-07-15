#!/usr/bin/env node
import inquirer from 'inquirer';
import chalk from 'chalk';
import minimist from 'minimist';
import { execSync } from 'child_process';

const argv = minimist(process.argv.slice(2));
const commitMsg = argv._[0];
const remote = argv.remote || 'origin';
const branch = argv.branch || 'main';
const files = argv.files || '.';
const shouldAmend = argv.amend || false;
const skipPush = argv['no-push'] || false;

async function run(cmd, options = {}) {
  try {
    execSync(cmd, { stdio: 'inherit', ...options });
  } catch (error) {
    const isGitCommit = cmd.startsWith('git commit');
    const isGitPush = cmd.startsWith('git push');

    if (isGitCommit) {
      console.error(chalk.red('❌ Git commit failed.'));
      console.error(chalk.gray('👉 This may be caused by a pre-commit or commit-msg hook (e.g., Husky).'));
    } else if (isGitPush) {
      console.error(chalk.red('❌ Git push failed.'));
      console.error(chalk.gray('👉 This may be caused by a pre-push hook or network issue.'));
    } else {
      console.error(chalk.red(`❌ Command failed: ${cmd}`));
    }

    if (typeof error.status !== "undefined") {
      console.error(chalk.red(`❌ Command exited with status ${error.status}`));
      process.exit(error.status);
    } else {
      console.error(chalk.red('❌ An unknown error occurred.'));
      process.exit(1);
    }
  }

  
}

function isInsideGitRepo() {
  try {
    execSync('git rev-parse --is-inside-work-tree', { stdio: 'ignore' });
    return true;
  } catch {
    return false;
  }
}

function isWorkingTreeClean() {
  const output = execSync('git status --porcelain').toString().trim();
  return output === '';
}

async function main() {
  if (argv.help || argv.h) {
    console.log(`
${chalk.green('Usage:')} gitgc [commit message] [--options]

${chalk.yellow('Options:')}
  --files <pattern>    Specify files/folders to add (default: .)
  --remote <name>      Remote name (default: origin)
  --branch <name>      Branch name (default: main)
  --amend              Amend the previous commit
  --no-push            Skip git push
  -h, --help           Show this help message
    `);
    return;
  }

  if (!isInsideGitRepo()) {
    console.error(chalk.red('❌ Not inside a Git repository.'));
    process.exit(1);
  }

  if (isWorkingTreeClean()) {
    console.log(chalk.yellow('✔️ Nothing to commit. Working tree is clean.'));
    return;
  }

  let finalMessage = commitMsg;

  if (!finalMessage) {

    const answers = await inquirer.prompt([
      {
        type: 'input',
        name: 'msg',
        message: '📝 Enter your commit message:',
        validate: input => input.trim() !== '' || 'Commit message cannot be empty',
      },
    ]);

    finalMessage = answers.msg;
  }

  console.log(chalk.blue(`📂 Adding files: ${files}`));

  run(`git add ${files}`);

  if (shouldAmend) {
    console.log(chalk.cyan(`🔧 Amending last commit...`));
    run(`git commit --amend -m "${finalMessage}"`);
  } else {
    console.log(chalk.green(`📝 Committing: "${finalMessage}"`));
    run(`git commit -m "${finalMessage}"`);
  }

  if (!skipPush) {
    console.log(chalk.magenta(`🚀 Pushing to ${remote}/${branch}...`));
    run(`git push ${remote} ${branch}`);
  } else {
    console.log(chalk.gray('📌 Skipped pushing as --no-push is set.'));
  }

  console.log(chalk.bold.green('✅ Done!'));
}

main();
