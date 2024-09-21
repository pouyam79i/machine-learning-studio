import pandas as pd

def csv(addr:str) -> pd.DataFrame:
    df = pd.read_csv(addr)    
    return df

