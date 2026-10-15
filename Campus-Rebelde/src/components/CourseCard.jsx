function CourseCard({ course, onAidRequest, onEnroll }) {
  return (
    <article className="course-card">
      <div className={`course-cover cover-${course.color}`}>
        <img src={course.image} alt={course.imageAlt} loading="lazy" />
        {course.label && <span className="course-label">{course.label}</span>}
        <button className="save-course" aria-label={`Guardar ${course.title}`} title="Guardar curso">
          ♡
        </button>
        <span className="cover-decoration" aria-hidden="true">✳</span>
      </div>
      <div className="course-content">
        <div className="course-meta">
          <span>{course.category}</span>
          <span className="course-rating"><span aria-hidden="true">★</span> {course.rating}</span>
        </div>
        <h3>{course.title}</h3>
        <p className="course-teacher">con <strong>{course.teacher}</strong></p>
        <div className="course-details">
          <span>{course.lessons} lecciones</span>
          <span>{course.level}</span>
        </div>
        <div className="course-buy-row">
          <span className="course-price">
            {course.price === 0 ? 'Gratis' : `$${course.price} `}
            {course.price > 0 && <small>MXN</small>}
          </span>
          <button className="enroll-button" onClick={onEnroll}>
            {course.price === 0 ? 'Ver curso' : 'Ver curso'}
            <span aria-hidden="true">↗</span>
          </button>
        </div>
        {course.price > 0 && (
          <button className="aid-link" onClick={onAidRequest}>
            No tengo recursos <span aria-hidden="true">♡</span>
          </button>
        )}
      </div>
    </article>
  )
}

export default CourseCard
