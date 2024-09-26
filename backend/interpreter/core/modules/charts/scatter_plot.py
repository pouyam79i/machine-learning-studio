import matplotlib.pyplot as plt
import base64
from io import BytesIO


def scatter_plot(node_hash:str=NODE_HASH, source_hash:str=SOURCE_HASH, target_hash:str=TARGET_HASH):
    send_node_status({
        'node_hash':node_hash,
        'status':'active'
    })
    xx, yy, Z = getTransfer(source_hash)
    send_status('generating plot on given model')
    
    plt.contourf(xx, yy, Z, alpha=0.3)
    plt.title('Decision Boundary')
    # TODO: pass feature names in props
    # plt.xlabel(iris.feature_names[0])
    # plt.ylabel(iris.feature_names[1])
    plt.xlabel('x_label')
    plt.ylabel('y_label')
    plt.legend()

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

