import React, { useEffect, useRef } from 'react';
import lottie from 'lottie-web';

interface LottieAnimationProps {
  animationData: object; // 动画数据
}

const LottieAnimation: React.FC<LottieAnimationProps> = ({ animationData }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      const animation = lottie.loadAnimation({
        container: containerRef.current, // 指定容器
        renderer: 'svg', // 渲染方式
        loop: true, // 循环播放
        autoplay: true, // 自动播放
        animationData, // 动画数据
      });

      return () => animation.destroy(); // 清理动画
    }
  }, [animationData]);

  return <div ref={containerRef} style={{ width: '400px', height: '400px' }} />; // 设置动画容器的大小
};

export default LottieAnimation; 