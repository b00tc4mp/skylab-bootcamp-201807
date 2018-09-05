import swal from 'sweetalert2'

const UserError = props => {
    let timerInterval
    return swal({
        title: `${props}!`,
        type: 'error',
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

export default UserError;
