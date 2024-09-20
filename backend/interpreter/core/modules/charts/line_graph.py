import matplotlib.pyplot as plt

def func_display(y_test, y_pred, label:str='Dot Line: Actual vs. Predicted', actual:str='Actual', predicted:str='Predicted'):
    # Create a scatter plot of actual vs. predicted values
    plt.scatter(y_test, y_pred)
    plt.xlabel(actual)
    plt.ylabel(predicted)
    plt.title(label)
    plt.show()
    