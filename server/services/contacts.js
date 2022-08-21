const { Contact } = require("../database/models")

const contactServices = {}

contactServices.getAllContacts = async () => {
    const contact = await Contact.findAll()
    return contact
}

contactServices.getContact = async(id) => {
    const contact = await Contact.findOne({
        where: { id }
    })
    return contact
}

module.exports = contactServices
