import ReactModal from 'react-modal';

const customStyles = {
  content: {
    width: '860px',
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    marginLeft: '125px',
    transform: 'translate(-50%, -50%)',
  },
};

const CommentModal = ({ isOpen, onClose, comment }) => {
  return (
    <ReactModal style={customStyles} isOpen={isOpen}>
      <div>{comment}</div>
      <button className="btn btn-info text-white mt-5" onClick={onClose}>
        Close
      </button>
    </ReactModal>
  );
};
export default CommentModal;
