
import React from "react";
import { useScroll } from "framer-motion";
import { motion } from "framer-motion";


const ScrollList = ({
  data,
  renderItem,
  itemHeight = 155, // Default item height
}) => {
  const listRef = React.useRef(null);
  const [focusedIndex, setFocusedIndex] = React.useState(0);

  const { scrollYProgress } = useScroll({
    container: listRef,
  });

  React.useEffect(() => {
    const updateFocusedItem = () => {
      if (!listRef.current) return;

      const container = listRef.current;
      const children = Array.from(container.children);
      const scrollTop = container.scrollTop;
      const containerCenter = container.clientHeight / 2;

      let closestItemIndex = 0;
      let minDistanceToCenter = Infinity;

      children.forEach((child, index) => {
        const itemTop = child.offsetTop;
        const actualItemHeight = child.offsetHeight;
        const itemCenter = itemTop + actualItemHeight / 2;

        const distanceToCenter = Math.abs(
          itemCenter - scrollTop - containerCenter
        );

        if (distanceToCenter < minDistanceToCenter) {
          minDistanceToCenter = distanceToCenter;
          closestItemIndex = index;
        }
      });

      setFocusedIndex(closestItemIndex);
    };

    updateFocusedItem();

    const listElement = listRef.current;
    if (listElement) {
      listElement.addEventListener("scroll", updateFocusedItem);
    }

    return () => {
      if (listElement) {
        listElement.removeEventListener("scroll", updateFocusedItem);
      }
    };
  }, [data, itemHeight]);

  const itemVariants = {
    hidden: {
      opacity: 0,
      scale: 0.7,
      transition: {
        duration: 0.35,
        ease: "easeOut",
      },
    },
    focused: {
      opacity: 1,
      scale: 1,
      zIndex: 10,
      transition: {
        duration: 0.35,
        ease: "easeOut",
      },
    },
    next: {
      opacity: 1,
      scale: 1,
      zIndex: 5,
      transition: {
        duration: 0.35,
        ease: "easeOut",
      },
    },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.35,
        ease: "easeOut",
      },
    },
  };

  return (
    <div
      ref={listRef}
      className="scroll-list__wrp scrollbar-hidden mx-auto w-full"
      style={{ overflowY: "auto" }}
    >
      {data.map((item, index) => {
        let variant = "hidden";

        if (index === focusedIndex) {
          variant = "focused";
        } else if (index === focusedIndex + 1) {
          variant = "next";
        } else {
          const isWithinVisibleRange = Math.abs(index - focusedIndex) <= 2;
          if (isWithinVisibleRange) {
            variant = "visible";
          }
        }

        return (
          <motion.div
            key={index}
            className="scroll-list__item mx-auto max-w-5xl"
            variants={itemVariants}
            initial="hidden"
            animate={variant}
            // style={{
            //   height: itemHeight ? `${itemHeight}px` : "auto",
            // }}
          >
            {renderItem(item, index)}
          </motion.div>
        );
      })}
    </div>
  );
};

export default ScrollList;
