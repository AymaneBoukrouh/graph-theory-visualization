import './EditorPanel.css';

interface EditorPanelProps {
  setEditorMode: (mode: string) => void;
}

const EditorPanel = ({ setEditorMode }: EditorPanelProps) => {
  return (
    <div className="d-flex flex-column p-3" id="editor-panel">
      <div className="position-relative" style={{ height: '35px', cursor: 'pointer' }} onClick={() => setEditorMode('node')}><div className="cell-node"></div></div>
      <div className="d-flex justify-content-center" style={{ height: '35px', cursor: 'pointer' }} onClick={() => setEditorMode('line')}>
        <div className="mt-1 ms-1" style={{
          width: '35px',
          height: '3px',
          transform: `rotate(45deg)`,
          transformOrigin: '0 0',
          backgroundColor: 'red',
        }}></div>
      </div>
      <div>Edit</div>
      <div>Run</div>
      {/** TODO: add clear button */}
    </div>
  )
}

export default EditorPanel;
