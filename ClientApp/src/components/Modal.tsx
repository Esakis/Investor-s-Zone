import React from 'react'
import { Button, Modal } from 'semantic-ui-react';



function ModalExampleTopAligned() {
    const [open, setOpen] = React.useState(false)

    return (
        <div className="ui two column centered grid">
  <div className="column"></div>
            <div className="four column centered row">
                <Modal
                    centered={false}
                    open={open}
                    onClose={() => setOpen(false)}
                    onOpen={() => setOpen(true)}
                    trigger={<Button>Show Modal</Button>}
                >
                    <Modal.Header>Thank you!</Modal.Header>
                    <Modal.Content>
                        <Modal.Description>
                            Your subscription has been confirmed
                        </Modal.Description>
                    </Modal.Content>
                    <Modal.Actions>
                        <Button onClick={() => setOpen(false)}>OK</Button>
                    </Modal.Actions>
                </Modal>
    <div className="column"></div>
    <div className="column"></div>
  </div>
</div>
        
    )
}

export default ModalExampleTopAligned