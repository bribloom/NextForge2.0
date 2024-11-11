"use client";

import { Category } from "@prisma/client";
import {
    DiAndroid,
    DiFirebase,
    DiPhotoshop,
    DiReact,
    DiJava,
}from "react-icons/di"
import { IconType } from "react-icons/lib";
import { CategoryItem } from "./category-item";



interface CategoriesProps {
    items: Category[];
}

const iconMap: Record<Category["name"], IconType> = {
    "Android Development": DiAndroid,
    "Firebase":DiFirebase,
    "Photoshop":DiPhotoshop,
    "React Native":DiReact,
    "Java Development":DiJava,
};

export const Categories = ({
    items,
}:CategoriesProps) => {
    return(
        <div className="flex items-center gap-x-2 overflow-x-auto pb-2">
           {items.map((item) =>(
            <CategoryItem
                key={item.id}
                label={item.name}
                icon={iconMap[item.name]}
                value={item.id}
            />
           ))}
        </div>
    )
}