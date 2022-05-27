import { useQuasar } from "quasar";

export default function useNotify () {

  const $q = useQuasar()

  // Success Notification with message parameter or not in input
  const notifySuccess = (message) =>{
    $q.notify({
      type: 'positive',
      message:  message || 'Proccess Ok'
    })
  }

    // Error Notification with message parameter or not in input
    const notifyError = (message) =>{
      $q.notify({
        type: 'negative',
        message:  message || 'Proccess Error!'
      })
    }

  return{
    notifySuccess,
    notifyError
  }
}
