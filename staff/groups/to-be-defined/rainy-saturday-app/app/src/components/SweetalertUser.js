
import swal from 'sweetalert2'

const UserSuccesful = props => {
    let timerInterval
    return swal({
        title: `${props} succesful!`,
        type: 'success',
        timer: 1500,
        onOpen: () => {
            swal.showLoading()
            timerInterval = setInterval(() => {
                swal.getContent().querySelector('strong')
            }, 100)
        },
        onClose: () => {
            clearInterval(timerInterval)
        }
    })
};

export default UserSuccesful;


