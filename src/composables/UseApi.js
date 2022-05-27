export default function useApi() {

    const axios = require('axios');

    //#region Get Data
    const getClientList = async(validation, type, value) => {
        try {
            if (validation != 0 && type != 'default' && value != 'default') {
                const response = await axios.get(process.env.API_VNA_GCBC, {
                    params: {
                        type,
                        value
                    }
                })
                return response.data
            } else {
                const response = await axios.get(process.env.API_VNA_GCLI)
                return response.data
            }
        } catch (error) {
            console.log(error)
        }
    }
    const getSales = async(validation, type, value) => {
        try {
            if (validation != 0 && type != 'default' && value != 'default') {
                const response = await axios.get(process.env.API_VNA_GSBC, {
                    params: {
                        type,
                        value
                    }
                })
                return response.data
            } else {
                const response = await axios.get(process.env.API_VNA_GSAL)
                return response.data
            }
        } catch (error) {
            console.log(error)
        }
    }

    const getStock = async(validation, type, value) => {
        try {
            if (validation != 0 && type != 'default' && value != 'default') {
                const response = await axios.get(process.env.API_VNA_GPBC, {
                    params: {
                        type,
                        value
                    }
                })
                return response.data
            } else {
                const response = await axios.get(process.env.API_VNA_GPRO)
                return response.data
            }
        } catch (error) {
            console.log(error)
        }
    }

    const get_client = async(id) => {
        try {
            const response = await axios.get(process.env.API_VNA_GONC, {
                params: {
                    id
                }
            })
            return response.data
        } catch (error) {
            console.log(error)
        }
    }

    const get_sale = async(id) => {
        try {
            const response = await axios.get(process.env.API_VNA_GONS, {
                params: {
                    id
                }
            })
            return response.data
        } catch (error) {
            console.log(error)
        }
    }

    const get_product = async(serial) => {
        try {
            const response = await axios.get(process.env.API_VNA_GONP, {
                params: {
                    serial
                }
            })
            return response.data
        } catch (error) {
            console.log(error)
        }
    }

    const get_users = async() => {
        var request = "request.data.users.code_1"
        try {
            const response = await axios.get(process.env.API_VNA_GUSR, {
                params: {
                    request
                }
            })
            console.log(response.data)
            return response.data
        } catch (error) {
            console.log(error)
            return response.data
        }
    }

    //#endregion

    //#region Post Data

    const postClient = async(cliform) => {
        try {
            const resp = await axios.post(process.env.API_VNA_PCLI, cliform)
            console.log(resp.status + "post")
        } catch (error) {
            console.log(error)
        }
    }

    const postSale = async(s_form) => {
        try {
            const response = await axios.post(process.env.API_VNA_PSAL, s_form)
            return response.status
        } catch (error) {
            console.log(error)
        }
    }

    const postStock = async(st_form) => {
        try {
            const response = await axios.post(process.env.API_VNA_PSTK, st_form)
            return response.status
        } catch (error) {
            console.log(error)
        }
    }

    const addUser = async(usr_form) => {
            try {
                const response = await axios.post(process.env.API_VNA_ADUS, usr_form)
                return response.status
            } catch (error) {
                console.log(error)
            }
        }
        //#endregion

    //#region Update Data
    const upClient = async(cli_form) => {
        try {
            const resp = await axios.put(process.env.API_VNA_UCLI, cli_form)
            return resp.status
        } catch (error) {
            return resp.status
        }
    }

    const upProduct = async(p_form) => {
        console.log(p_form)
        try {
            const response = await axios.put(process.env.API_VNA_UPRO, p_form)
            return response.status
        } catch (error) {
            console.log(error)
        }
    }

    const upSale = async(s_form) => {

        const s_form_aux = {
            sale_id: s_form.Sale_id,
            serial: s_form.serial,
            valor: s_form.valor,
            model: s_form.model,
            client_id: s_form.client_id,
            date: s_form.date
        }
        console.log(s_form_aux)
        try {
            const response = await axios.put(process.env.API_VNA_USAL, s_form_aux)
            return response.status
        } catch (error) {
            console.log(error)
        }
    }

    //#endregion

    //#region Delete Data

    const del_client = async(id) => {
        try {
            const resp = await axios.delete(process.env.API_VNA_DCLI, {
                params: {
                    id
                }
            })
        } catch (error) {
            return error
        }
    }

    const del_sale = async(id) => {
        try {
            const resp = await axios.delete(process.env.API_VNA_DSAL, {
                params: {
                    id
                }
            })
        } catch (error) {
            return error
        }
    }

    const del_product = async(id) => {
        try {
            const resp = await axios.delete(process.env.API_VNA_DPRO, {
                params: {
                    id
                }
            })
        } catch (error) {
            return error
        }
    }

    //#endregion

    const login = async(user_form) => {
        console.log(user_form)
        try {
            const response = await axios.post(process.env.API_VNA_VLOG, user_form.value)
            return response.data
        } catch (error) {
            return error
        }
    }

    const verifyUser = async(token_inp) => {
        try {
            const response = await axios.get(process.env.API_VNA_VTKN + token_inp)
            return response.data
        } catch (error) {
            return response.status
        }
    }

    const total_u = async() => {
        try {
            const response = await axios.get(process.env.API_VNA_TUSR);
            return response.data;
        } catch (error) {
            console.log(erro)
            return error
        }
    }
    const total_adm = async() => {
        try {
            const response = await axios.get(process.env.API_VNA_TADM);
            return response.data;
        } catch (error) {
            console.log(erro)
            return error
        }
    }
    const last_u = async() => {
        try {
            const response = await axios.get(process.env.API_VNA_LENT);
            return response.data;
        } catch (error) {
            console.log(erro)
            return error
        }
    }

    return {
        getClientList,
        get_client,
        postClient,
        upClient,
        del_client,
        getSales,
        get_sale,
        postSale,
        del_sale,
        upProduct,
        getStock,
        postStock,
        get_product,
        del_product,
        upSale,
        addUser,
        verifyUser,
        login,
        total_u,
        total_adm,
        last_u,
        get_users
    }
}