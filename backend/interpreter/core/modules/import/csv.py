import pandas as pd

def func_import(addr:str) -> pd.DataFrame:
    df = pd.read_csv(addr)    
    return df