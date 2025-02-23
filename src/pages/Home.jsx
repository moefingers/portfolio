
import '../assets/styles/home.css'
import TextRoller from '../components/TextRoller'

import { useEffect, useRef, useState } from 'react'
// glob import
const fullImageBlobImport = Object.values(import.meta.glob("@assets/images/homepage/*.{png,jpg,jpeg,PNG,JPEG,webp,WEBP,svg}", { eager: true, query: '?url', import: 'default' }))
const fullReds = fullImageBlobImport.filter((blob) => blob.includes("fullreds"))
// console.log(fullReds)
const standingByScooter = fullImageBlobImport.filter((blob) => blob.includes("standing-by-scooter"))

export default function Home() {


    async function handleMouseMoveImage(event) {
        
        const mouseDevice = matchMedia('(pointer:fine)').matches
        const touchDevice = matchMedia('(pointer:coarse)').matches

        let percentXFromTop
        let percentYFromTop
        const boundingRect = event.currentTarget.getBoundingClientRect()

        if(mouseDevice){

            const xPosInBox = (event.clientX - boundingRect.x)
            const yPosInBox = (event.clientY - boundingRect.y)

            percentXFromTop = xPosInBox / boundingRect.width * 100
            percentYFromTop = yPosInBox / boundingRect.height * 100
        } else if(touchDevice){
            
            const xPosInBox = (event.touches[0].clientX - boundingRect.x)
            const yPosInBox = (event.touches[0].clientY - boundingRect.y)
            
            percentXFromTop = xPosInBox / boundingRect.width * 100
            percentYFromTop = yPosInBox / boundingRect.height * 100
        }

        event.target.style.setProperty('--x', percentXFromTop + '%')
        event.target.style.setProperty('--y', percentYFromTop + '%')
        
    }


    const scrollElementRef = useRef(null)
        
    useEffect(() => {
        const scrollElement = scrollElementRef.current
        const scrollBarWidth = (scrollElement.offsetWidth - scrollElement.clientWidth)
        scrollElement.style.paddingLeft = `${scrollBarWidth / scrollElement.offsetWidth * 52}%`
        scrollElement.style.paddingRight = `${scrollBarWidth / scrollElement.offsetWidth * 52}%`
    }, [scrollElementRef])

    return (    
        <div className="home-page-container">
            <div className='scroll-element' ref={scrollElementRef}>
                <div className='under-construction'>🚧this site is under heavy construction🚧</div>
                <div>Sometimes you need an <em>employee</em>... Other times? An <em>asset</em>.</div>
                <div className="intro">I'm <em>Mohammad Zuiter</em>, {window.innerWidth < 600 ? <br/> : ''}your future<TextRoller/></div>
                <div>Even on this very site, you are using my <a href="#/Posts/infinity-response">Infinity Response</a> <em>font-size</em> and positioning, 
                    a <em>GitHub API</em> on my <a href="#/Projects">Projects</a> page, and some
                    extremely clever <em>javascript</em> for <em>maximum compatability</em> across older devices.
                </div>

                <div className='image-container' onMouseMove={handleMouseMoveImage} onTouchMove={handleMouseMoveImage}>
                    <img className='background' src={standingByScooter} alt="a blurred image of mohammad zuiter in a red blazer" />
                    <img className='foreground' src={standingByScooter} alt="an overlaying image of mohammad zuiter in a red blazer that is has visible portions on hover" />
                    <div className='note'>scooter prior to <a href="https://www.instagram.com/p/C5M3I0rOErz/" target='_blank'>light upgrades</a>, full post coming soon</div>
                </div>
            </div>
        </div>
    )
}