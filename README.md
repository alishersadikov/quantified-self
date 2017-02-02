# Quantified Self
Quantified Self is an application built in JavaScript <strong>to help track calorie intake and expenditure in a diary form.</strong>  

## Setup

To get started, run the folowing in your terminal: 
  ```shell
  git clone https://github.com/alishersadikov/quantified-self.git
  ```
  
  Change into the directory: 
  ```shell
  cd quantified-self
  ```
  
  This project is built with Webpack. Therefore, to set it up: 
  
  ```shell
  npm install
  ```
  
  To start the server locally: 
  ```shell
   npm start
  ```
  
  You should now be able to browse the application on browser of choice by entering: 
  ```shell
  http://localhost:8080
  ```
## How it works
### Foods 
  To get started lets add some foods to your diet. You can do this by clicking "Create New" in the foods section or visiting the following link: 
  ```shell
  http://localhost:8080/foods.html
  ```
  On the foods page, enter a name and calories and hit "Add Food". If you wish to update the food, you can click the name or the calorie amount in the table below and update them to a different value. You can only enter numbers for calories without punctuation. 
  
### Exercises  
  Once you have added several foods, now it is time to add exercises. Click "Exercises" button at the top of the page or visit: 
  ```shell
  http://localhost:8080/exercises.html
  ```
  Follow the same steps to add exercises. The exercises are also editable in the same way that foods are. Now you are ready to update your diary. Click the "Go to Diary" button in order to return to the diary. 

### Diary
  
The diary will default to the current day, but you can store store diary entries for different dates as well. 
Let us just start with today. You can add foods to different meals by selecting the check-boxes on the left hand side of the foods table located at the bottom left of the page, then clicking the meal button you wish to add it to above. 

