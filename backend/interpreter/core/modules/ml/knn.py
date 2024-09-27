import numpy as np
from sklearn.neighbors import KNeighborsClassifier

def knn(node_hash:str=NODE_HASH, source_hash:str=SOURCE_HASH, target_hash:str=TARGET_HASH):
    send_node_status({
        'node_hash':node_hash,
        'status':'active'
    })
    send_status('training dataset with K-NN...')
    X, _, X_train, _, y_train, _ = getTransfer(source_hash)
    
    # number of neighbors 
    k = int(props[node_hash][0]['data'])

    # Train the KNN model
    knn = KNeighborsClassifier(n_neighbors=k)
    knn.fit(X_train, y_train)

    # create decision boundaries
    x_min, x_max = X[:, 0].min() - 1, X[:, 0].max() + 1
    y_min, y_max = X[:, 1].min() - 1, X[:, 1].max() + 1
    xx, yy = np.meshgrid(np.arange(x_min, x_max, 0.01),
                        np.arange(y_min, y_max, 0.01))
    Z = knn.predict(np.c_[xx.ravel(), yy.ravel()])
    Z = Z.reshape(xx.shape)
    
    send_status('done training.')
    setTransfer(target_hash, [xx, yy, Z])
    send_node_status({
        'node_hash':node_hash,
        'status':'done'
    })
    
