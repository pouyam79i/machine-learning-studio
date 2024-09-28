import matplotlib.pyplot as plt
import base64
from io import BytesIO

def line_graph(node_hash:str=NODE_HASH, source_hash:str=SOURCE_HASH, target_hash:str=TARGET_HASH):
    send_node_status({
        'node_hash':node_hash,
        'status':'active'
    })
    send_status('generating plot on given model')
    
    xx, yy, _ = getTransfer(source_hash)
    
    plt.figure(figsize=(10, 6))
    plt.plot(xx, yy, color='red', linewidth=2, label='Regression Line')
    plt.title('Linear Regression Model.')
    plt.xlabel('X')
    plt.ylabel('y')
    plt.legend()
    plt.grid()
    
    # Transfer to base64 image
    buf = BytesIO()
    plt.savefig(buf, format='png')
    buf.seek(0)
    img_str = base64.b64encode(buf.read()).decode('utf-8')
    buf.close()

    send_status('done generating plot.')
    send_node_status({
        'node_hash':node_hash,
        'status':'done'
    })
    send_popup(data={'data':img_str, 'title':'Decision Boundary', 'type':'base64'})

