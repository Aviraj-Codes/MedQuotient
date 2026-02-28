import pandas as pd
import numpy as np
from sklearn.preprocessing import StandardScaler, OneHotEncoder
from sklearn.pipeline import Pipeline
from sklearn.compose import ColumnTransformer
from sklearn.linear_model import LinearRegression
from sklearn.ensemble import RandomForestRegressor
from sklearn.tree import DecisionTreeRegressor
from sklearn.model_selection import train_test_split
import joblib
import warnings
warnings.filterwarnings('ignore')

data = pd.read_csv('insurance.csv')
df = pd.DataFrame(data=data)

categorical_cols = ['sex', 'smoker', 'region']
numerical_cols = ['age', 'bmi', 'children']

# Map smoker to binary flag
df['smoker_flag'] = df['smoker'].map({'yes': 1, 'no': 0})

# Define X (features) and y (target)
X = df.drop(columns=['charges'])
y = df['charges']

# Split into train and test
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Preprocessing pipelines
numerical_pipeline = Pipeline([('scaler', StandardScaler())])
categorical_pipeline = Pipeline([('onehot', OneHotEncoder())])
preprocessor_pipeline = ColumnTransformer([
    ('num', numerical_pipeline, numerical_cols),
    ('cat', categorical_pipeline, categorical_cols)
])

# Model pipelines
forest_pipeline = Pipeline([
    ('preprocessor', preprocessor_pipeline),
    ('model', RandomForestRegressor(n_estimators=100, n_jobs=-1, random_state=42))
])
trained_pipeline=forest_pipeline.fit(X_train,y_train)
joblib.dump(trained_pipeline,'insurance_pipeline.joblib')

# now time to make the flask application for this 
from flask import Flask,render_template,request
app=Flask(__name__)
@app.route('/', methods=['GET', 'POST'])
def predict():
    if request.method == 'POST':
        data = {
            'age': int(request.form['age']),
            'sex': request.form['sex'],
            'bmi': float(request.form['bmi']),
            'children': int(request.form['children']),
            'smoker': request.form['smoker'],
            'region': request.form['region']
        }
        input_df = pd.DataFrame([data])
        trained_pipeline = joblib.load('insurance_pipeline.joblib')
        predicted_price = trained_pipeline.predict(input_df)
        return render_template('index.html', Prediction=predicted_price)
    else:
        return render_template('index.html', Prediction=None)

if __name__=='__main__':
    app.run(debug=True)
