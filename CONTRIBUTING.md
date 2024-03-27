# Contributing to this project

This document will help you familiarize yourself with our development process.

## Suggesting corrections
When making changes to the source code, please follow the following guidelines:

   1. Each change should be logically complete and as minimal as possible. This will allow us to test and accept it more quickly.

   2. Follow the code formatting rules
   3. Describe in detail what your code fixes and why.
   4. If your fix requires updating the documentation (Help, Encyclopedia, etc.), don't forget to update it as well.
   5. It is advisable to submit fixes as pull-requests to the repository.


## Bug reports
A bug is a demonstrable problem that is caused by the code in the repository. Good bug reports are extremely helpful - thank you!

Guidelines for bug reports:

1. Use the GitHub issue search — check if the issue has already been reported.

2. Check if the issue has been fixed — try to reproduce it using the latest master branch in the repository.


## Making Changes

1. **Create a Branch**: 
   
   Before making any changes, create a new branch for your feature or bug fix:

    ```bash
    git checkout -b feature-branch
    ```

2. **Implement Changes**: 
   
   Make your desired changes to the codebase.

3. **Commit Changes**: Commit your changes with a descriptive message:

    ```bash
    git commit -m "Description of changes"
    ```

4. **Push Changes**: Push your branch to the remote repository:

    ```bash
    git push origin feature-branch
    ```

### Pre-commit Hooks

We use prefix hooks to automatically check code before committing. If your code doesn't meet the formatting standards or doesn't pass the tests, the commit will be rejected. Make sure your code meets these standards before committing.


