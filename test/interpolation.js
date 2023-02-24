const FilterTimeline = () => {
	const dist = document.body.getBoundingClientRect().height
    const delta = dist / 3

    const START = 0
    const A = delta
    const B = delta * 2
    const C = delta * 2.5

	const timelineInterface = {
        title: {
            $TIME: [ START, A, C ],
            trY: 0,
        },
        phone: {
            $TIME: [ START, A, B ],
            trY: 0,
            opacity: 0
        },
        phoneBackground: {
            $TIME: [ A, B ],
            opacity: 0
        },
        filters: {
            $TIME: [ A, C ],
            trY: 0,
        },
        text: {
            $TIME: [ B, C ],
            trY: 0,
            opacity: 0
        }
	}
	
	const timeline = [
        {
            $TIME: START,
            title: {
                trY: 0,
            },
            phone: {
                trY: 1000,
                opacity: 0
            }
        },
        {
            $TIME: A,
            title: {
                trY: -300,
            },
            phone: {
                trY: 500,
                opacity: 1
            },
            phoneBackground: {
                opacity: 1
            },
            filters: {
                trY: 0
            }
        },
        {
            $TIME: B,
            phone: {
                trY: 300,
                opacity: 1
            },
            phoneBackground: {
                opacity: 0
            },
            text: {
                trY: 200,
                opacity: 0
            }
        },
        {
            $TIME: C,
            title: {
                trY: -150,
            },
            filters: {
                trY: 0
            },
            text: {
                trY: 100,
                opacity: 1
            }
        },
	]

    return { timeline, interface: timelineInterface }
}

const points = { value: null }
Renderer.setToRender({
    handler: () => {
        const config = FilterTimeline()
        points.value = Renderer.getInterpolated(config, window.scrollY)
        console.log(points.value)
    },
})