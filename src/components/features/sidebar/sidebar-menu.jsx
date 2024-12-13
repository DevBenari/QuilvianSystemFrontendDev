'use client'
import Link from 'next/link'
import React,{memo,Fragment, useState, useEffect} from 'react'
import { Tooltip, OverlayTrigger } from 'react-bootstrap'

import useCachedPathname from '@/lib/hooks/useCachePathname'

const SideBarMenu = memo((props) => {

    let location = useCachedPathname();
    return (
        <Fragment>
            {props.isTag === 'true' &&
                <li className={`${location === `${props.pathname}` ? 'active main-active' : ''}`}>
                <Link className={`${location === `${props.pathname}` ? 'iq-waves-effect': ''}`} aria-current="page" href={props.pathname}>
                    <OverlayTrigger placement="right" overlay={<Tooltip>{props.title}</Tooltip>}>
                        {props.children}
                    </OverlayTrigger>
                    <span className="item-name">{props.title} </span>{props.isNew === 'true' ? <span className="badge badge-danger">New</span>: ""}
                </Link>
            </li>
            }
            {
                props.isTag === 'false' &&
                <li className={`${location === `${props.pathname}` ? 'active' : ''}`}>
                <Link href={props.pathname} onClick={props.modalopen} target={props.target}>
                    { props.staticIcon === 'true' &&
                        <i className={props.iconClass}>
                        {/* <svg className="icon-10" xmlns="http://www.w3.org/2000/svg" width="10" viewBox="0 0 24 24" fill="currentColor">
                            <g>
                                <circle cx="12" cy="12" r="8" fill="currentColor"></circle>
                            </g>
                        </svg> */}
                        </i>
                    }
                    {props.children}
                    
                    <span className="item-name"> {props.title} </span>{props.isNew === 'true' ? <span className="badge badge-danger">New</span>: ""}
                </Link>
                </li>
            }
        </Fragment>
    )
})

SideBarMenu.displayName = "SideBarMenu"
export default SideBarMenu