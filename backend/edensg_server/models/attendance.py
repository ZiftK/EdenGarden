from sqlalchemy import Column, Integer, String, ForeignKey, DateTime, func
from sqlalchemy.orm import relationship
from .database import Base

class Attendance(Base):
    __tablename__ = "asistencia"

    id_asistencia = Column(Integer, primary_key=True, index=True)
    fk_empleado = Column(Integer, ForeignKey("empleado.id_empleado"))
    fecha = Column(DateTime, default=func.current_date())
    hora_entrada = Column(DateTime, default=func.current_timestamp())
    hora_salida = Column(DateTime, nullable=True)
    horas_trabajadas = Column(String, nullable=True)
    horas_extra = Column(String, nullable=True)

    # Relationships
    empleado = relationship("Employee", back_populates="asistencias")

    def calculate_hours(self):
        if not self.hora_salida:
            return

        # Calculate worked hours
        time_diff = self.hora_salida - self.hora_entrada
        total_hours = time_diff.total_seconds() / 3600  # Convert to hours

        # Regular work day is 8 hours
        if total_hours <= 8:
            self.horas_trabajadas = f"{total_hours:.2f}"
            self.horas_extra = "0.00"
        else:
            self.horas_trabajadas = "8.00"
            self.horas_extra = f"{(total_hours - 8):.2f}" 