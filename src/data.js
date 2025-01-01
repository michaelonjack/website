const data = {
    projects: [
        {
            type: 'professional',
            name: 'BlueGenAI',
            position: 'Software Engineer',
            startDate: 'June 2024',
            endDate: 'Present',
            links: [
                {
                    label: 'Site',
                    url: 'https://bluegenai.com'
                }
            ],
            technologies: ['Python', 'Flask', 'LlamaIndex'],
            details: [
                'Leading development on agentic AI tools for public sector case management systems.'
            ]
        },
        {
            type: 'professional',
            name: 'OmniSystems Inc.',
            position: 'Software Engineer',
            startDate: 'June 2020',
            endDate: 'June 2024',
            links: [
                {
                    label: 'Site',
                    url: 'https://www.omnisystems.com/'
                }
            ],
            technologies: ['Java', 'Javascript', 'SQLServer'],
            details: [
                'Lead development on a baseline Audits & Investigations system equipped with common auditing functionality which has been used to help reduce the time needed to produce a client-ready application.'
            ]
        },
        {
            type: 'professional',
            name: 'Tyler Technologies',
            position: 'Software Engineer',
            startDate: 'August 2016',
            endDate: 'June 2020',
            links: [
                {
                    label: 'Site',
                    url: 'https://www.tylertech.com'
                }
            ],
            technologies: ['Java', 'Javascript', 'SQLServer'],
            details: [
                'Helped build configurable Workflow Tracking and BPM software systems using the company\'s entellitrak platform.',
                'Lead development on a baseline Background Investigations system equipped with common BI application functionality which has been used to help reduce the time needed to produce a client-ready application. Among other things, the system is able to:',
                'Developed a timekeeping module used by multiple systems to track their investigators\' working hours. The module works in compliance with Law Enforcement Availability Pay (LEAP) federal regulations.'
            ]
        },
        {
            type: 'personal',
            name: 'Imprint',
            platform: 'iOS',
            date: '2020',
            links: [
                {
                    label: 'App Store',
                    url: 'https://apps.apple.com/us/app/imprint-revisit-your-memories/id1511361497'
                }, {
                    label: 'Github',
                    url: 'https://github.com/michaelonjack/Imprint'
                }, {
                    label: 'Demo',
                    url: 'https://imgur.com/ffmdp2v'
                }
            ],
            technologies: ['Swift', 'ARKit', 'Firebase'],
            details: [
                'Augmented reality-based media sharing application.',
                'Users can capture pictures and videos and revisit them at the exact location they were taken by viewing them in an AR scene.',
                'The application saves each picture\'s 2D coordinate as well as the euler angles of the user\'s device at the time the picture was taken in order to correctly orient the image in 3D space.',
                'Features a real-time chat component that users can use for private messaging.'
            ]
        },
        {
            type: 'personal',
            name: 'Thread',
            platform: 'iOS',
            date: '2019',
            links: [
                {
                    label: 'App Store',
                    url: 'https://apps.apple.com/us/app/thread-share-what-you-wear/id1203555931'
                }, {
                    label: 'Github',
                    url: 'https://github.com/michaelonjack/Thread'
                }
            ],
            technologies: ['Swift', 'Firebase'],
            details: [
                'Social media app that allows users to share what they\'re wearing with the world.',
                'Uses CoreLocation to find users within a two-mile radius from you and displays their profile data on a map.',
                'Interacts with the ShopStyle API in order to allow users to search through a vast amount of clothing data to help find their exact outfit.'
            ]
        },
        {
            type: 'personal',
            name: 'Tailgator',
            platform: 'iOS',
            date: '2018',
            links: [
                {
                    label: 'App Store',
                    url: 'https://apps.apple.com/us/app/tailgator-share-your-gameday/id1386231487'
                }, {
                    label: 'Github',
                    url: 'https://github.com/michaelonjack/Tailgate'
                }
            ],
            technologies: ['Swift', 'Python', 'Firebase'],
            details: [
                'iOS application used to keep track of your college football tailgates.',
                'Allows users to create new tailgates, invite other users, and share images of their set-up.',
                'Features real-time score updates for major-conference games by interacting with a self-hosted endpoint that runs a python script which parses the score data from an HTML page.'
            ]
        }
    ]
}

export default data