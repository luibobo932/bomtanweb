import Link from "next/link";

export default function NotFound() {
  return (
    <div className="container-shell flex min-h-screen flex-col items-center justify-center text-center">
      <div className="section-kicker">404</div>
      <h1 className="mt-4 text-4xl font-black">Khong tim thay noi dung</h1>
      <p className="mt-4 max-w-lg text-[var(--muted)]">
        Route nay chua ton tai trong MVP scaffold. Ban co the quay lai trang chu hoac mo feed video.
      </p>
      <div className="mt-8 flex gap-3">
        <Link href="/" className="primary-btn">
          Ve trang chu
        </Link>
        <Link href="/feed" className="secondary-btn">
          Mo feed video
        </Link>
      </div>
    </div>
  );
}
