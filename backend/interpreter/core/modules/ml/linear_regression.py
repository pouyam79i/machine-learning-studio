from sklearn.linear_model import LinearRegression
import numpy as np

def linear_regression(node_hash:str=NODE_HASH, source_hash:str=SOURCE_HASH, target_hash:str=TARGET_HASH):
    send_node_status({
        'node_hash':node_hash,
        'status':'active'
    })
    send_status('training dataset with linear regression...')
    X, y, X_train, X_test, y_train, y_test, labels = getTransfer(source_hash)

    # Create and train the model
    model = LinearRegression()
    model.fit(X_train, y_train)

    # Make predictions
    Z = model.predict(X_test)

    # Create a range of values for X to plot the regression line
    xx = np.linspace(X.min(), X.max(), 100).reshape(-1, 1)
    yy = model.predict(xx)

    send_status('done training.')
    setTransfer(target_hash, [xx, yy, Z, [X_train, y_train], labels])
    send_node_status({
        'node_hash':node_hash,
        'status':'done'
    })
    
