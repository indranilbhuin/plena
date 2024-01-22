import React, { useCallback, useMemo, useRef } from 'react';
import { Dimensions, PanResponder, View } from 'react-native';
import * as shape from 'd3-shape';
import { moderateScale } from 'react-native-size-matters';
import {
  Circle,
  Defs,
  G,
  LinearGradient,
  Path,
  Polygon,
  Rect,
  Stop,
  Line as SvgLine,
  Text,
} from 'react-native-svg';
import { AreaChart } from 'react-native-svg-charts';
import { colors } from '../../assets/colors';
import { formatDate } from '../utils/dateUtils';

function LineChart({
  chartDataValue,
  setPositionX,
  positionX,
  stroke,
}) {
  const CHART_HEIGHT = 244;
  const apx = (size = 0) => {
    const { width } = Dimensions.get('window');
    return (width / 750) * size;
  };
  const chartData = chartDataValue?.map((data) => data[1]);

  const Line = (props) => {
    const { line, chartHasData } = props;
    return (
      <Path
        key="line"
        d={line}
        stroke={stroke}
        strokeWidth={2}
        fill="none"
        opacity={chartHasData ? 1 : 0.85}
      />
    );
  };

  const Tooltip = useCallback(
    ({ x, y }) => {
      if (positionX < 0) {
        return null;
      }
      const dateAndTimeData = chartDataValue?.[positionX]?.[0];
      console.log("date", dateAndTimeData)
      const [date, time] = formatDate(dateAndTimeData).split('|');
      console.log('time',time)
      const sideLength = 10;
      const height = (Math.sqrt(3) / 2) * sideLength;
      return (
        <G x={x?.(positionX)} key="tooltip">
          <G>
            <SvgLine
              y1={1}
              y2={CHART_HEIGHT}
              stroke={colors.redBackground}
              strokeWidth="1"
              strokeDasharray="5 5"
            />
            <G>
              <Circle
                cy={y?.(chartData[positionX]) || 0}
                r={apx(20 / 2)}
                stroke={colors.white}
                strokeWidth={apx(1)}
                fill={colors.white}
              />
              <Rect
                y={y?.(chartData[positionX]) - 50 || 0}
                x={-45}
                width={moderateScale(86)}
                height={moderateScale(36)}
                fill={colors.white}
                rx={5}
                ry={5}
              />
              <Text
                x={-40}
                y={y?.(chartData[positionX]) - 35}
                fill="black"
                fontFamily="ProductSans-Regular"
                fontSize={8}
              >
                {date}
              </Text>
              <Text
                x={-20}
                y={y?.(chartData[positionX]) - 20}
                fill="black"
                fontFamily="ProductSans-Bold"
                fontSize={9}
              >
                {time}
              </Text>
            </G>
            <Polygon
              x={5}
              y={y?.(chartData[positionX]) - 5}
              points={`0,${height} ${sideLength}, ${height} ${
                sideLength / 2
              },0`}
              fill="white"
              transform="rotate(180)"
            />
          </G>
        </G>
      );
    },
    [chartData, chartDataValue, positionX]
  );

  const DataGradient = () => (
    <Defs key="dataGradient">
      <LinearGradient
        id="dataGradient"
        x1="0%"
        y1="0%"
        x2="0%"
        y2={`${CHART_HEIGHT}px`}
      >
        <Stop stopColor={colors.gray} stopOpacity="0.4" />
        <Stop offset="1" stopColor={colors.gray} stopOpacity="0" />
      </LinearGradient>
    </Defs>
  );

  const onActiveIndexChange = useCallback(
    (index) => {
      setPositionX(index);
    },
    [setPositionX]
  );

  const updatePosition = useCallback(
    (x) => {
      if (x === -1) {
        onActiveIndexChange(-1);
        return;
      }
      const chartWidth = Dimensions.get('window').width;
      const xDistance = chartWidth / chartData?.length;
      if (x <= 0) {
        // eslint-disable-next-line
        x = 0;
      }
      if (x >= chartWidth) {
        // eslint-disable-next-line
        x = chartWidth;
      }
      let value = Number((x / xDistance).toFixed(0));
      if (value >= chartData?.length - 1) {
        value = chartData?.length;
      }
      onActiveIndexChange(value);
    },
    [chartData?.length, onActiveIndexChange]
  );

  const prevTouch = useRef({ x: 0, y: 0 });
  const panResponder = useMemo(
    () =>
      PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onStartShouldSetPanResponderCapture: () => true,
        onMoveShouldSetPanResponder: () => true,
        onMoveShouldSetPanResponderCapture: () => true,
        onPanResponderTerminationRequest: () => true,
        onPanResponderGrant: (evt) => {
          // save current touch for the next move
          prevTouch.current = {
            x: evt.nativeEvent.locationX,
            y: evt.nativeEvent.locationY,
          };
          updatePosition(evt.nativeEvent.locationX);
        },
        onPanResponderMove: (evt) => {
          const deltaX = evt.nativeEvent.locationX - prevTouch.current.x;
          const deltaY = evt.nativeEvent.locationY - prevTouch.current.y;
          const isHorizontalSwipe = Math.abs(deltaX) > Math.abs(deltaY);

          // setIsChartBeingTouched(isHorizontalSwipe);
          updatePosition(
            isHorizontalSwipe ? evt.nativeEvent.locationX : -1
          );

          // save current touch for the next move
          prevTouch.current = {
            x: evt.nativeEvent.locationX,
            y: evt.nativeEvent.locationY,
          };
        },

        onPanResponderRelease: () => {
          updatePosition(-1);
        },
      }),
    [updatePosition]
  );

  // useEffect(() => {
  //   panResponder.current = panResponder;
  // }, [chartData, panResponder, updatePosition]);

  return (
    <View {...panResponder?.panHandlers}>
      <AreaChart
        style={{
          height: CHART_HEIGHT,
          width: Dimensions.get('screen').width,
        }}
        data={chartData}
        curve={shape.curveNatural}
        contentInset={{ top: apx(180), bottom: apx(40) }}
        svg={{ fill: `url(#dataGradient)` }}
      >
        <Line chartHasData />
        <Tooltip />
        <DataGradient />
      </AreaChart>
    </View>
  );
}

export default LineChart;