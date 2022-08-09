import * as Styled from "../Feed/style";
import React, { useEffect } from "react";
import InfiniteScroll from "@src/components/@shared/InfiniteScroll";
import { useInfiniteQuery } from "react-query";
import { ResponseMessages } from "@src/@types/shared";
import { getMessages } from "@src/api/messages";
import { FlexColumn } from "@src/@styles/shared";
import MessageCard from "@src/components/MessageCard";
import { useLocation, useParams } from "react-router-dom";
import SearchInput from "@src/components/SearchInput";
import useTopScreenEventHandler from "@src/hooks/useTopScreenEventHandlers";
import { previousMessagesCallback, nextMessagesCallback } from "@src/api/utils";
import useMessageDate from "@src/hooks/useMessageDate";
import MessagesLoadingStatus from "@src/components/MessagesLoadingStatus";
import { extractResponseMessages } from "@src/@utils";
import { QUERY_KEY } from "@src/@constants";
import useBookmark from "@src/hooks/useBookmark";
import DateDropdown from "@src/components/DateDropdown";
import useModal from "@src/hooks/useModal";
import Portal from "@src/components/@shared/Portal";
import Dimmer from "@src/components/@shared/Dimmer";
import Calendar from "@src/components/Calendar";
import EmptyStatus from "@src/components/EmptyStatus";
import SearchOptions from "@src/components/SearchOptions";
import useChannelIds from "@src/hooks/useChannelIds";

function SpecificDateFeed() {
  const { key: queryKey } = useLocation();
  const { date, channelId } = useParams();
  const { isRenderDate } = useMessageDate();

  const {
    data,
    isFetching,
    isSuccess,
    fetchPreviousPage,
    hasPreviousPage,
    fetchNextPage,
    hasNextPage,
    refetch,
  } = useInfiniteQuery<ResponseMessages>(
    [QUERY_KEY.SPECIFIC_DATE_MESSAGES, queryKey],
    getMessages({
      date,
      channelId,
    }),
    {
      getPreviousPageParam: previousMessagesCallback,
      getNextPageParam: nextMessagesCallback,
    }
  );

  const {
    channelsData,
    channelIds,
    defaultChannel,
    handleToggleChannelId,
    handleToggleAllChannelIds,
  } = useChannelIds({ defaultChannelId: channelId ? Number(channelId) : 0 });

  const {
    isModalOpened: isSearchInputFocused,
    handleOpenModal: handleOpenSearchOptions,
    handleCloseModal: handleCloseSearchOptions,
  } = useModal();

  const {
    isModalOpened: isCalenderOpened,
    handleOpenModal: handleOpenCalendar,
    handleCloseModal: handleCloseCalendar,
  } = useModal();

  const { onWheel, onTouchStart, onTouchEnd } = useTopScreenEventHandler({
    isCallable: hasPreviousPage,
    callback: fetchPreviousPage,
    scrollOffset: 300,
    touchDistanceCriterion: -50,
    wheelDistanceCriterion: -10,
  });

  const { handleAddBookmark, handleRemoveBookmark } = useBookmark({
    handleSettle: refetch,
  });

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [queryKey]);

  const parsedData = extractResponseMessages(data);

  return (
    <Styled.Container
      onWheel={onWheel}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      {isSearchInputFocused && (
        <Dimmer hasBackgroundColor={false} onClick={handleCloseSearchOptions} />
      )}
      <SearchInput
        placeholder="검색 할 키워드를 입력해주세요."
        onFocus={handleOpenSearchOptions}
      >
        {channelsData && defaultChannel && isSearchInputFocused && (
          <SearchOptions
            data={channelsData}
            defaultChannel={defaultChannel}
            channelIds={channelIds}
            handleToggleChannelId={handleToggleChannelId}
            handleToggleAllChannelIds={handleToggleAllChannelIds}
          />
        )}
      </SearchInput>

      <InfiniteScroll
        callback={fetchNextPage}
        threshold={0.9}
        endPoint={!hasNextPage}
      >
        <FlexColumn gap="4px" width="100%">
          {isFetching && <MessagesLoadingStatus length={20} />}
          {isSuccess && parsedData.length === 0 && <EmptyStatus />}
          {parsedData.map(
            ({
              id,
              username,
              postedDate,
              text,
              userThumbnail,
              isBookmarked,
            }) => {
              const parsedDate = postedDate.split("T")[0];

              return (
                <React.Fragment key={id}>
                  {isRenderDate(parsedDate) && (
                    <DateDropdown
                      postedDate={parsedDate}
                      channelId={channelId ?? ""}
                      handleOpenCalendar={handleOpenCalendar}
                    />
                  )}
                  <MessageCard
                    username={username}
                    date={postedDate}
                    text={text}
                    thumbnail={userThumbnail}
                    isBookmarked={isBookmarked}
                    toggleBookmark={
                      isBookmarked
                        ? handleRemoveBookmark(id)
                        : handleAddBookmark(id)
                    }
                  />
                </React.Fragment>
              );
            }
          )}

          {isFetching && <MessagesLoadingStatus length={20} />}
        </FlexColumn>
      </InfiniteScroll>

      <Portal isOpened={isCalenderOpened}>
        <>
          <Dimmer hasBackgroundColor={true} onClick={handleCloseCalendar} />
          <Calendar
            channelId={channelId ?? ""}
            handleCloseCalendar={handleCloseCalendar}
          />
        </>
      </Portal>
    </Styled.Container>
  );
}

export default SpecificDateFeed;
