import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score
import psycopg2

conn = psycopg2.connect(
    host="localhost",
    database="postgres",
    user="postgres",
    password="rootroot"
)

cursor = conn.cursor()
cursor.execute("SELECT t1.\"ID\", t1.\"Country\", t1.\"Description\", t1.\"IsMaster\", t1.\"Name\", t1.\"Rating\", t1.\"StartYear\", t1.\"UserID\", t1.\"ID0\", t2.\"ChessTournamentID\", t2.\"ChessPlayerID\", t2.\"DateSigned\", t2.\"Description\", t2.\"DurationPlayed\", t3.\"ID\", t3.\"ChessPlayerID\", t3.\"ConsecutiveYears\", t3.\"Current\", t3.\"Description\", t3.\"LastTrophy\", t3.\"MaxRating\", t3.\"Record\", t1.\"Bio\", t1.\"BirthDate\", t1.\"ConfirmationCode\", t1.\"IsActive\", t1.\"Password\", t1.\"PhoneNumber\", t1.\"UserName\" \
FROM ( \
    SELECT t.\"ID\", t.\"Country\", t.\"Description\", t.\"IsMaster\", t.\"Name\", t.\"Rating\", t.\"StartYear\", t.\"UserID\", t0.\"ID\" AS \"ID0\", t0.\"Bio\", t0.\"BirthDate\", t0.\"ConfirmationCode\", t0.\"IsActive\", t0.\"Password\", t0.\"PhoneNumber\", t0.\"UserName\" \
    FROM \"tblChessPlayers\" AS t \
    INNER JOIN \"tblUserProfiles\" AS t0 ON t.\"UserID\" = t0.\"ID\" \
) AS t1 \
LEFT JOIN \"tblChessParticipations\" AS t2 ON t1.\"ID\" = t2.\"ChessPlayerID\" \
LEFT JOIN \"tblChessChampions\" AS t3 ON t1.\"ID\" = t3.\"ChessPlayerID\" \
ORDER BY t1.\"ID\", t1.\"ID0\", t2.\"ChessTournamentID\", t2.\"ChessPlayerID\"")

users = cursor.fetchall()

# Iterate over the retrieved users
for user in users:
    user_id = user[0]
    username = user[1]
    # Perform desired operations on the user data
    print(f"User ID: {user_id}, Username: {username}")


# Step 1: Load the data from your ChessPlayer table or any data source
data = pd.read_csv('your_data_file.csv')  # Replace 'your_data_file.csv' with the actual file path

# Step 2: Perform feature engineering
data['Total_Champions'] = data['list_of_champions'].apply(len)
data['Total_Participations'] = data['list_of_participations'].apply(len)

# ... Add more feature engineering steps based on your requirements

# Step 3: Preprocess the data
# Handle missing values, normalize numeric features, encode categorical variables, etc.

# Step 4: Split the data into training and testing sets
X = data[['Total_Champions', 'Total_Participations', 'rating']]
y = data['predicted_champion']  # Replace 'predicted_champion' with the actual target column name
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Step 5: Train the model
model = RandomForestClassifier()  # You can use any other classifier based on your requirements
model.fit(X_train, y_train)

# Step 6: Make predictions
predictions = model.predict(X_test)

# Step 7: Evaluate the model
accuracy = accuracy_score(y_test, predictions)
print(f"Model Accuracy: {accuracy}")

# Step 8: Use the trained model to make predictions for all players
all_players_predictions = model.predict(X)

# You can now use 'all_players_predictions' to get the predicted champions for all players in your ChessPlayer table
