import LoadingImage from '../assets/loading/loading.svg'

const Loading = () => {
    return (
        <div className="flex flex-col items-center gap-2">
            <p className="font-script text-3xl text-(--black-color)">
                Loading...
            </p>

            <div className="h-32 w-[50dvh]">
                <img
                    src={LoadingImage}
                    alt="loading"
                    className="h-full w-full object-contain"
                />
            </div>
        </div>
    )
}

export default Loading
