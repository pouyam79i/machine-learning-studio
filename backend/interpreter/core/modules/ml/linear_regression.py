from typing import List
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LinearRegression
from sklearn.metrics import mean_squared_error

def linear_regression(raw_data ,features:List[str]=None , targets:List[str]=None):
    # prepare the data
    if features != None:
        X = raw_data[features] 
        y = raw_data[targets]  
    else:
        X = raw_data[0]
        y = raw_data[1]  

    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
    
    # train model
    model = LinearRegression()
    model.fit(X_train, y_train)
    
    y_pred = model.predict(X_test)
    return y_test, y_pred

