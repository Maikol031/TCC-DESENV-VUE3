<template>
    <div class="flex gap-x-2">
        <div class="status-item">
            <span class="status-dot status-disponivel"></span>
            Vazia
        </div>
        <div class="status-item">
            <span class="status-dot status-parcial"></span>
            Parcial
        </div>
        <div class="status-item">
            <span class="status-dot status-indisponivel"></span>
            Lotada
        </div>
    
    </div>

</template>
<style>

.status-item {
    display: flex;
    align-items: center;
    font-size: 16px;
}

.status-dot {
    width: 16px;
    height: 16px;
    border-radius: 100%;
    display: inline-block;
    margin-right: 8px;
    border: 2px solid #EEE;
    box-shadow: 0 0 2px rgba(0, 0, 0, 0.04);
}


.status-disponivel {
    background: #39C46E;
}

.status-indisponivel {
    background: #F74D4D;
}

.status-parcial {
    background: #e0de4d;
}

</style>