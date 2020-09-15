# seoul-air-pollution-tracker

To get this working locally please follow these steps:

1) Download the Measurement_summary.csv file from https://www.kaggle.com/bappekim/air-pollution-in-seoul/data#Measurement_summary.csv

2) Run index.html on Live Server in Visual Studio IDE in order to test out the program.

3) Click on the upload button for file and pick the .csv file you downloaded earlier in order to have the data extracted using Papa Parser.

4) Enter two dates between 1/1/2017 to 7/28/2017, where the first date entered is the start date and the second date entered should be the end date in order for the data to be correctly filtered. 

5) After entering the start (first calender) and end (second calendar) dates, hit the Submit button next to the calendars and then on the dropdown menu select the station you would like to see data from.
Note: It takes about 5-10 seconds for the data to be extracted, so wait until you see the background color change on Generate Dropdown List button when you hover over it.

6) You can click any other station from the drop down menu and it will display the data for the station. You can change the input dates as well and click submit to see data for different dates.

Comments: I have limited the amount of data to only 5,000 entries as the graph was looking extremely weird (multiple lines when there should only be one) when I allowed a larger amount of entries to be included. I could not resolve the issue. Therefore, the valid input dates you can enter are between 1/1/2017 to 7/28/2017
