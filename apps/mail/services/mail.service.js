// mail service

import { loadFromStorage, makeId, saveToStorage } from '../services/util.service.js'
import { storageService } from '../services/async-storage.service.js'

const MAIL_KEY = 'mailDB'
_createMails(mails)

const gMailsDemoData = [
    {
        id: 'e101',
        createdAt: 1651133930500,
        subject: 'Miss you! 💌',
        body: 'Would love to catch up sometime soon. Coffee?',
        isRead: false,
        sentAt: 1651133930594,
        removedAt: null,
        from: 'momo@momo.com',
        to: 'user@appsus.com'
    },
    {
        id: 'e102',
        createdAt: 1651200000000,
        subject: '🧾 Invoice #42356 - July',
        body: 'Your monthly invoice is attached. Thank you for your payment.',
        isRead: true,
        sentAt: 1651200000400,
        removedAt: null,
        from: 'billing@store.com',
        to: 'user@appsus.com'
    },
    {
        id: 'e103',
        createdAt: 1651300000000,
        subject: '🔥 Hot Deals Just for You!',
        body: 'Check out our summer sale - up to 50% off selected items!',
        isRead: false,
        sentAt: 1651300000594,
        removedAt: null,
        from: 'offers@shoppingnow.com',
        to: 'user@appsus.com'
    },
    {
        id: 'e104',
        createdAt: 1651400000000,
        subject: '🗓️ Meeting Tomorrow @ 10:00',
        body: 'Quick reminder that we’re meeting tomorrow. Zoom link inside.',
        isRead: true,
        sentAt: 1651400000594,
        removedAt: null,
        from: 'teamlead@company.com',
        to: 'user@appsus.com'
    },
    {
        id: 'e105',
        createdAt: 1651500000000,
        subject: 'Re: Photos from last weekend 📸',
        body: 'Loved the pics you sent! Here are a few of mine.',
        isRead: false,
        sentAt: 1651500000594,
        removedAt: null,
        from: 'friend@mail.com',
        to: 'user@appsus.com'
    },
    {
        id: 'e106',
        createdAt: 1651600000000,
        subject: 'URGENT: Password Reset Required ⚠️',
        body: 'We detected suspicious activity. Please reset your password immediately.',
        isRead: false,
        sentAt: 1651600000594,
        removedAt: null,
        from: 'security@bank.com',
        to: 'user@appsus.com'
    },
    {
        id: 'e107',
        createdAt: 1651700000000,
        subject: '🎉 You’ve been selected!',
        body: 'Congratulations! You’re eligible for an exclusive reward.',
        isRead: true,
        sentAt: 1651700000594,
        removedAt: null,
        from: 'noreply@luckydraw.com',
        to: 'user@appsus.com'
    },
    {
        id: 'e108',
        createdAt: 1651800000000,
        subject: 'To-Do List ✅ - Week 32',
        body: 'Don’t forget: Submit report, book flights, reply to Alex.',
        isRead: false,
        sentAt: 1651800000594,
        removedAt: null,
        from: 'tasks@productivity.io',
        to: 'user@appsus.com'
    },
    {
        id: 'e109',
        createdAt: 1651900000000,
        subject: 'Lunch on Friday? 🥗',
        body: 'Free for lunch around 13:00? Let’s try that new Thai place.',
        isRead: false,
        sentAt: 1651900000594,
        removedAt: null,
        from: 'amy@friends.com',
        to: 'user@appsus.com'
    },
    {
        id: 'e110',
        createdAt: 1652000000000,
        subject: 'Status Update: 📦 Order #99872',
        body: 'Your order is out for delivery and should arrive tomorrow.',
        isRead: true,
        sentAt: 1652000000594,
        removedAt: null,
        from: 'tracking@shoponline.com',
        to: 'user@appsus.com'
    },
    {
        id: 'e111',
        createdAt: 1652100000000,
        subject: '👩‍💻 Your Interview on Aug 7',
        body: 'We’re looking forward to speaking with you. Please confirm attendance.',
        isRead: false,
        sentAt: 1652100000594,
        removedAt: null,
        from: 'hr@bigtech.com',
        to: 'user@appsus.com'
    },
    {
        id: 'e112',
        createdAt: 1652200000000,
        subject: 'Daily Digest 📬 - 5 new updates',
        body: 'Here’s what you missed today on your favorite channels.',
        isRead: true,
        sentAt: 1652200000594,
        removedAt: null,
        from: 'digest@socialhub.com',
        to: 'user@appsus.com'
    },
    {
        id: 'e113',
        createdAt: 1652300000000,
        subject: '🧠 Mindfulness Tip #37',
        body: 'Take a deep breath. Notice how your body feels. Be present.',
        isRead: false,
        sentAt: 1652300000594,
        removedAt: null,
        from: 'newsletter@calmzone.app',
        to: 'user@appsus.com'
    },
    {
        id: 'e114',
        createdAt: 1652400000000,
        subject: 'Rent Receipt 🏠 - August 2025',
        body: 'Thank you for your payment. This is your digital receipt.',
        isRead: true,
        sentAt: 1652400000594,
        removedAt: null,
        from: 'landlord@rentalco.com',
        to: 'user@appsus.com'
    },
    {
        id: 'e115',
        createdAt: 1652500000000,
        subject: 'RE: Feedback on the pitch deck 📊',
        body: 'Great start! Let’s add more details to slide 3 and polish the CTA.',
        isRead: false,
        sentAt: 1652500000594,
        removedAt: null,
        from: 'investor@ventures.co',
        to: 'user@appsus.com'
    }
]

export const mailService = {
    query,
    get,
    remove,
    save,
}

function query(filterBy = {}) {
    return storageService.query(MAIL_KEY)
        .then(mails => {
            if (filterBy.txt) {
                const regExp = new RegExp(filterBy.txt, 'i')
                mails = mails.filter(mail => regExp.test(mail.subject))
            }
            if (filterBy.minSpeed) {
                mails = mails.filter(mail => mail.speed >= filterBy.minSpeed)
            }
            // console.log(' mails:', mails)
            return mails
        })
}

function get(mailId) {
    return storageService.get(MAIL_KEY, mailId).then(_setNextPrevMailId)
}

function remove(mailId) {
    // return Promise.reject('Oh No!')
    return storageService.remove(MAIL_KEY, mailId)
}

function save(mail) {
    if (mail.id) {
        return storageService.put(MAIL_KEY, mail)
    } else {
        return storageService.post(MAIL_KEY, mail)
    }
}


function _createMails() {
    let mails = loadFromStorage(MAIL_KEY)
    if (!mails || !mails.length) {
        mails = gMailsDemoData
        saveToStorage(MAIL_KEY, mails)
    }
}

function _createMail(vendor, speed = 250) {
    const mail = getEmptyMail(vendor, speed)
    mail.id = makeId()
    return mail
}


