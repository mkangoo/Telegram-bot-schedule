## Contributing Guide

Thank you for considering contributing to our project! Here's how you can get started:

### Running the Project

1. **Clone the Repository**:  
   Begin by cloning the repository to your local machine:

    ```bash
    git clone <repository_URL>
    ```

2. **Install Dependencies**:  
 Navigate to the project directory and install the required dependencies using npm:

    ```bash
    cd project-directory
    npm install
    ```

3. ***Setting Up Bot Token***:

- **Registering the Bot and Obtaining the Token**: Go to [BotFather](https://t.me/BotFather), register your bot, and obtain a unique token.

- **Creating the `.env` File**: Create a file named `.env` in the root directory of your project.

- **Adding the Token to the `.env` File**: Add your token to the `.env` file as shown below:

	```bash
	TELEGRAM_TOKEN = 'Your token'
	```
4.  **Start the Project**:  
    After installing the dependencies and adding the token, start the project:

    ```bash
    npm run dev
    ```

5. **Testing**: Ensure all tests pass successfully:

    ```bash
    npm test
    ```
### BOT SETUP
1. **Setting up a schedule**:  
    Edit the file `src/data/database.js.` If there are no lectures or practices, leave the corresponding array empty.
	``` bash
	day: 'Friday',
		events: [
			{
				// Start Time
				start: '2024-01-22T08:15:00',

				// End Time
				end: '2024-01-22T09:45:00',

				// Item Name
				title: 'Maths',

				// Week Numbers For Lectures
				lection: [1, 2, 3, 4, 5, 6],

				// Week Numbers For Practical
				practical: [7, 8],

				// Full Name Of The Teacher
				description: 'Sergeeva K.N.',

				// Audience
				audience: 'LK - 507',
			}
		]
	```
2. **Support**:  
    By command `/support` the user receives a message with contact information for communication. Edit the file `src/contactMe.js`

3. **Time Offset**:  
  Please note that the project uses time offset +3 Moscow time. To adjust the value, change line 104 in the file `src/handlers/scheduleHandler.js`
	```bash
	date.setUTCHours(currentHours + 3)
	```


### Making Changes

1. **Create a Branch**: Before making any changes, create a new branch for your feature or bug fix:

    ```bash
    git checkout -b feature-branch
    ```

2. **Implement Changes**: Make your desired changes to the codebase.

3. **Commit Changes**: Commit your changes with a descriptive message:

    ```bash
    git commit -m "Description of changes"
    ```

4. **Push Changes**: Push your branch to the remote repository:

    ```bash
    git push origin feature-branch
    ```

### Pre-commit Hooks

We use pre-commit hooks to automatically check the code formatting before committing. If your code doesn't meet the formatting standards, the commit will be rejected. Ensure your code adheres to these standards before committing.

### Thank You!

Thank you for your interest in contributing to our project! If you have any questions or suggestions, please don't hesitate to reach out. Your contributions are highly appreciated.
