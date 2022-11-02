package ccfit.nsu.ru.spi.repository;

import ccfit.nsu.ru.spi.model.entity.TemplateConfigEntity;
import ccfit.nsu.ru.spi.model.entity.TemplateType;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TemplateConfigRepository extends JpaRepository<TemplateConfigEntity, Long> {

    List<TemplateConfigEntity> findAll();
    Optional<TemplateConfigEntity> findByType(TemplateType type);

}