const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const axios = require('axios');

// Set the directory containing the local repositories
const repoDir = 'C:\\Location\\Of\\Repos';

// Set the new GitHub account's username and token (replace with actual values)
const newUsername = '<GH_UserName>';
const newToken = '<GH_Token>';

// GitHub API URL to create repositories
const githubApi = 'https://api.github.com/user/repos';

// Function to create a GitHub repository
async function createRepo(repoName) {
    try {
      const response = await axios.post(
        githubApi,
        {
          name: repoName,
          private: true
        },
        {
          headers: {
            'Authorization': `token ${newToken}`,
            'Content-Type': 'application/json',
            'User-Agent': newUsername
          }
        }
      );
      return response.data;
    } catch (error) {
      console.error(`Failed to create repository: ${repoName}`, error.response ? error.response.data : error.message);
      throw error;
    }
  }
  
  // Function to process each local repository
  async function processRepositories() {
    const directories = fs.readdirSync(repoDir, { withFileTypes: true })
      .filter(dirent => dirent.isDirectory())
      .map(dirent => dirent.name);
  
    for (const dir of directories) {
      const repoPath = path.join(repoDir, dir);
      console.log(`Processing repository: ${repoPath}`);
      
      try {
        // Check if the directory is a Git repository
        const gitDir = path.join(repoPath, '.git');
        if (!fs.existsSync(gitDir)) {
          console.log(`Initializing Git repository in: ${repoPath}`);
          execSync('git init', { cwd: repoPath });
          execSync('git add .', { cwd: repoPath });
          execSync('git commit -m "Initial commit"', { cwd: repoPath });
        }
  
        // Create a new GitHub repository
        await createRepo(dir);
        console.log(`Created GitHub repository: ${dir}`);
  
        // Change to the repository directory
        process.chdir(repoPath);
  
        // Check if remote 'origin' exists
        let remotes;
        try {
          remotes = execSync('git remote').toString().trim().split('\n');
        } catch (error) {
          remotes = [];
        }
  
        if (remotes.includes('origin')) {
          // Set the remote URL
          execSync(`git remote set-url origin https://${newUsername}:${newToken}@github.com/${newUsername}/${dir}.git`);
        } else {
          // Add the remote URL
          execSync(`git remote add origin https://${newUsername}:${newToken}@github.com/${newUsername}/${dir}.git`);
        }
  
        // Push all branches and tags
        execSync('git push -u origin --all');
        execSync('git push -u origin --tags');
  
        console.log(`Pushed repository: ${dir}\n\n\n\n`);
      } catch (error) {
        console.error(`Failed to process repository: ${repoPath}`, error.message);
      }
    }
  }
  
  // Run the script
  processRepositories();