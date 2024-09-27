const Loading = () => {
    return (
        <div className="flex items-center justify-center">
            <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 border-4 border-black border-t-transparent rounded-full animate-spin"></div>
                <p className="text-2xl font-semibold">로딩 중...</p>
            </div>
        </div>
    );
};
export default Loading;
