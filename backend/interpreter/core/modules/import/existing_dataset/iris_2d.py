from sklearn import datasets
from sklearn.model_selection import train_test_split

def iris_2d(node_hash:str=NODE_HASH, source_hash:str=SOURCE_HASH, target_hash:str=TARGET_HASH):
    send_status('loading iris dataset...')
    
    iris = datasets.load_iris()
    X = iris.data[:, :2]  # Use only the first two features for 2D.
    y = iris.target

    # Split the dataset into training and testing sets
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
    
    # ****************** this is a standards ******************
    setTransfer(target_hash, [X, y, X_train, X_test, y_train, y_test])
    send_status('done loading iris.')
    
