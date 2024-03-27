# Telegram bot for viewing the schedule

This bot is designed for students to easily view the list of upcoming lessons.
  

### Bot Commands
- /start - Start the bot
- /schedule - View schedule
- /week - Determine even/odd weeks
- /week_schedule - Full schedule for the current week
- /next_week_schedule - Full schedule for the next week
- /support - Contact information for communication

<!-- ## Content
- Технологии 
- Тестирование
- Contributing
- ToDo -->
  
## Documentation
#### BOT INSTALL

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

5. **Testing**:
	
	Ensure all tests pass successfully:

    ```bash
    npm run test
    ```
	View code coverage:
	```bash
    npm run coverage
    ```
	

#### BOT SETUP
1. **Setting up a schedule**:  
    Edit the file `src/data/database.js.` If there are no lectures or practices, leave the corresponding array empty.
	```bash
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
2. **Basic setup**:  
    Go to src/commands/replyTemplates.js.
	Make the following changes:

- descriptionMessage - a message that welcomes the user before starting to work with the bot

- descriptionOfTheHeader - description in the bot's header

- greetingMessage - the message that appears when using the `/start` command

- contactInfo - information for contacting support. It must indicate contact methods if errors are found, the bot is stopped or other problems.
	This information is available using the `/support` command

3. **Time Offset**:  
 Please remove or change the time offset. Go to src/core/schedule.js and make changes to the getDayIndex functions 
 ```bash
 date.setUTCHours(currentHours + 3)	
 ```

## Contribution, Feature Requests & Bugs
Read [CONTRIBUTING.md](https://github.com/mkangoo/Telegram-bot-schedule/blob/master/CONTRIBUTING.md) before opening bugs, feature requests and pull request.
