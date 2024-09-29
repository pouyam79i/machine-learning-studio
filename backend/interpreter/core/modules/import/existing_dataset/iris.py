import pandas as pd
from sklearn.datasets import load_iris
from sklearn.model_selection import train_test_split

def iris(node_hash:str=NODE_HASH, source_hash:str=SOURCE_HASH, target_hash:str=TARGET_HASH):
    send_status('loading iris dataset...')
    send_node_status({
        'node_hash':node_hash,
        'status':'active'
    })
    
    # test portion
    test_portion = float(props[node_hash][0]['data'])
    
    iris = load_iris()
    X = iris.data[:, :2]  # Use only the first two features for 2D plotting
    y = iris.target
        
    # Split the dataset into training and testing sets
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=test_portion, random_state=42)
    
    # ****************** this is a standards ******************
    setTransfer(target_hash, [X, y, X_train, X_test, y_train, y_test, ['sepal width (cm)', 'sepal length (cm)']])
    send_status('done loading iris.')
    send_node_status({
        'node_hash':node_hash,
        'status':'done'
    })
    
