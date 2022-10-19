package ccfit.nsu.ru.spi.model.dto.response.templates;

import ccfit.nsu.ru.spi.model.entity.TemplateType;
import io.swagger.v3.oas.annotations.media.Schema;
import java.time.ZonedDateTime;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class TemplateInfoResponse {

    @Schema(description = "Идентификатор", example = "100", nullable = true)
    private Long id;

    @Schema(description = "Тип шаблона", example = "SPRING", nullable = true)
    private TemplateType type;

    @Schema(description = "Дата последнего изменения конфигурации", nullable = true)
    private ZonedDateTime lastUpdateTime;

    @Schema(description = "Пользовательское название шаблона",
        example = "Шаблона МС-а проекта SPI", nullable = true)
    private String title;

    @Schema(description = "Пользовательское описание шаблона",
        example = "Шаблон с java 17, spring 2.4.9")
    private String description;

}
