import pandas as pd
from sklearn.model_selection import train_test_split

def csv(node_hash:str=NODE_HASH, source_hash:str=SOURCE_HASH, target_hash:str=TARGET_HASH):
    send_status('preparing your data for training...')
    send_node_status({
        'node_hash':node_hash,
        'status':'active'
    })
    
    # db name
    db_name = str(props[node_hash][0]['data'])
    if not db_name.endswith('.csv'):
        db_name = db_name + '.csv'
    # features
    features = str(props[node_hash][1]['data'])
    features = features.replace(' ', '')
    features = features.split(',')
    # targets
    targets = str(props[node_hash][2]['data'])
    targets = targets.replace(' ', '')
    targets = targets.split(',')
    # test portion
    test_portion = float(props[node_hash][3]['data'])
    
    
    # Load and prepare the dataset.
    data = pd.read_csv("./" + db_name)

    X = data[features].values  
    y = data[targets].values

    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=test_portion, random_state=42)
    
    # transfer output
    setTransfer(target_hash, [X, y, X_train, X_test, y_train, y_test])
    send_status('done loading dataset.')
    send_node_status({
        'node_hash':node_hash,
        'status':'done'
    })
    
