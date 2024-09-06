# GitHub Repository Bulk Migration Script

This script automates the migration of local Git repositories to a new GitHub account by initializing the repositories (if not already initialized), creating corresponding repositories on GitHub, and pushing the contents to the new GitHub repository.

## Features
- Automatically initializes Git repositories if they aren't already initialized.
- Creates corresponding private repositories on a new GitHub account.

## Prerequisites

Before running this script, ensure that you have:

1. **Node.js** installed on your machine.
2. **Git** installed and available in your system's PATH.
3. A **GitHub account** with a valid personal access token.

## Setup

1. Clone or download the repository containing this script.
2. Install dependencies by running the following command:

    ```bash
    npm install axios
    ```

3. Edit the following variables in the script to match your setup:

    - `repoDir`: Set this to the path where your local repositories are stored.
    - `newUsername`: Your new GitHub account username.
    - `newToken`: Your GitHub personal access token. You can generate a new token in GitHub [here](https://github.com/settings/tokens).

## Usage

1. Navigate to the directory containing the script.
2. Run the script using Node.js:

    ```bash
    node bulkCreate.js
    ```

The script will:

1. Loop through each directory in the specified `repoDir`.
2. Initialize a Git repository (if not already initialized).
3. Create a private repository on GitHub for each local repository.
4. Push all branches and tags to the newly created GitHub repository.

## Script Explanation

- **`createRepo` function**: This function uses the GitHub API to create a new private repository on your GitHub account.
- **`processRepositories` function**: This function processes each local directory, initializes Git repositories (if necessary), creates the corresponding GitHub repository, and pushes the content to GitHub.

## Error Handling

If the script encounters an issue while creating a repository or pushing content, an error message will be displayed for that specific repository, and the script will continue processing the remaining repositories.

## Notes

- The script assumes that each folder in the specified directory represents a separate Git repository.
- Make sure that you have write access to the GitHub account and that your personal access token has the required permissions to create repositories and push code.

## License

This script is licensed under the MIT License. See [LICENSE.md](LICENSE.md) for more details.
